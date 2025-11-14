import { NextResponse } from "next/server";
import { OrderRequest } from "@/app/features/cart/types";
import connectToDatabase from "@/lib/mongodb";
import { IReferral, referral } from "@/models/referral";

export async function POST(request: Request) {
  try {
    const timestamp = request.headers.get("X-Timestamp");
    const body: OrderRequest = await request.json();

    if (!timestamp) {
      return NextResponse.json(
        { success: false, message: "Invalid request signature" },
        { status: 401 }
      );
    }


    await connectToDatabase();

    // Validate required fields
    if (!body.customerName?.trim() || !body.customerEmail?.trim()) {
      return NextResponse.json(
        { success: false, message: "Customer details are required" },
        { status: 400 }
      );
    }

    if (!body.items?.length) {
      return NextResponse.json(
        { success: false, message: "Cart items are required" },
        { status: 400 }
      );
    }

    // Validate each item has a cohort
    const itemsWithoutCohort = body.items.filter(
      (item) => !item.cohort._id?.trim()
    );
    if (itemsWithoutCohort.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cohort selection is required for all items",
          invalidItems: itemsWithoutCohort.map((item) => item.title),
        },
        { status: 400 }
      );
    }

    const invalidItems = body.items.filter(
      (item) =>
        !item.owners ||
        item.owners.length !== item.quantity ||
        item.owners.some((email) => !email?.trim())
    );

    if (invalidItems.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "All slots must have valid owner emails",
          invalidItems: invalidItems.map((item) => item.title),
        },
        { status: 400 }
      );
    }

    // Handle referral code if provided
    let referralCodeDetails = {
      id: null,
      name: null,
    };
    if (body.referralCode) {
      const referralCode: IReferral | null = await referral.findOne({
        codeName: body.referralCode,
      });
      if (!referralCode) {
        return NextResponse.json(
          { success: false, message: "Invalid referral code" },
          { status: 400 }
        );
      }

      // Validate referral code
      if (referralCode.usageCount >= referralCode.usageLimit) {
        return NextResponse.json(
          { success: false, message: "Referral code usage limit exceeded" },
          { status: 400 }
        );
      }

      // Calculate total quantity of all items
      const totalQuantity = body.items.reduce((sum, item) => sum + item.quantity, 0);
      
      // Check if adding this order's quantity would exceed the usage limit
      if (referralCode.usageCount + totalQuantity > referralCode.usageLimit) {
        return NextResponse.json(
          { 
            success: false, 
            message: `Referral code usage limit would be exceeded. Only ${referralCode.usageLimit - referralCode.usageCount} slots remaining.` 
          },
          { status: 400 }
        );
      }

      if (new Date(referralCode.expiryDate) < new Date()) {
        return NextResponse.json(
          { success: false, message: "Referral code has expired" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: "Order validated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating order:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
