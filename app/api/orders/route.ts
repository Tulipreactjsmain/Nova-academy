import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import { nanoid } from "nanoid";
import { OrderRequest } from "@/app/features/cart/types";
import { Types } from "mongoose";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { referral } from "@/models/referral";
import { sendEmail } from "@/app/services/email";
import { generateCoursePurchaseEmail } from "@/app/services/emailTemplates";
import Cohort from "@/models/Cohort";
import formatDate from "@/app/utils/formatDate";

export async function POST(request: Request) {
  try {
    const timestamp = request.headers.get("X-Timestamp");
    const paystackReference = request.headers.get("X-Paystack-Reference");
    const body: OrderRequest = await request.json();

    if (!timestamp || !paystackReference) {
      return NextResponse.json(
        { success: false, message: "Invalid request signature" },
        { status: 401 }
      );
    }

    // Verify Paystack transaction first
    const verificationResponse = await verifyPaystackTransaction(
      paystackReference
    );
    if (!verificationResponse.success) {
      return NextResponse.json(
        { success: false, message: verificationResponse.data },
        { status: 400 }
      );
    }

    // Verify amount matches
    const paystackAmount = verificationResponse.data.amount / 100; // Convert from kobo to naira
    if (paystackAmount !== body.totalAmount) {
      return NextResponse.json(
        { success: false, message: "Payment amount mismatch" },
        { status: 400 }
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
      const referralCode = await referral.findOne({
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

      if (new Date(referralCode.expiryDate) < new Date()) {
        return NextResponse.json(
          { success: false, message: "Referral code has expired" },
          { status: 400 }
        );
      }

      referralCodeDetails = {
        id: referralCode._id,
        name: referralCode.codeName,
      };
    }

    // Create order with additional payment info
    const order = await Order.create({
      orderId: nanoid(10),
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail.trim(),
      totalAmount: body.totalAmount,
      status: "success",
      paymentReference: paystackReference,
      paymentProvider: "paystack",
      referralCode: referralCodeDetails,
      items: body.items.map((item) => ({
        courseId: new Types.ObjectId(item._id),
        courseTitle: item.title,
        quantity: item.quantity,
        pricePerUnit: item.price.current,
        owners: item.owners.map((email) => email.trim()),
        cohortId: new Types.ObjectId(item.cohort._id),
      })),
    });

    // Fetch cohort start dates
    const cohortIds = order.items.map(
      (item: { cohortId: Types.ObjectId }) => item.cohortId
    );
    const cohorts = await Cohort.find({ _id: { $in: cohortIds } });
    const cohortMap = new Map(
      cohorts.map((cohort) => [cohort._id.toString(), cohort.startDate])
    );

    // Send individual emails to each course owner
    for (const item of order.items) {
      for (const ownerEmail of item.owners) {
        const cohortStartDate = cohortMap.get(item.cohortId.toString());
        if (!cohortStartDate) {
          console.error(
            `Cohort start date not found for cohort ID: ${item.cohortId}`
          );
          continue;
        }

        const emailContent = generateCoursePurchaseEmail(
          ownerEmail.split("@")[0], // Use email username as name
          order.orderId,
          formatDate(new Date().toLocaleDateString()),
          [
            {
              courseTitle: item.courseTitle,
              cohortStartDate: formatDate(cohortStartDate),
            },
          ]
        );

        await sendEmail({
          to: ownerEmail,
          subject: "Your NOVA Academy Purchase Confirmation",
          html: emailContent,
        });
      }
    }

    // Update referral code usage if used
    if (referralCodeDetails.id) {
      // Calculate total quantity of all items
      const totalQuantity = body.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Create a single usage history entry for the entire order
      const usageHistoryEntry = {
        customerName: body.customerName.trim(),
        orderId: order.orderId, // Add order reference
        courses: body.items.map((item) => ({
          courseId: item._id,
          courseTitle: item.title,
          quantity: item.quantity,
        })),
        usedAt: new Date(),
        totalQuantity: totalQuantity,
      };

      await referral.findByIdAndUpdate(referralCodeDetails.id, {
        $inc: { usageCount: totalQuantity },
        $push: { usageHistory: usageHistoryEntry },
      });
    }

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
