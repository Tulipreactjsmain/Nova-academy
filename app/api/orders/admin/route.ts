import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import verifyToken from "@/middlewares/verifyToken";
import adminOnly from "@/middlewares/adminOnly";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  try {
    const tokenVerification = await verifyToken(request);
    if (!tokenVerification.ok) {
      return tokenVerification;
    }

    const adminCheck = await adminOnly(request);
    if (!adminCheck.ok) {
      return adminCheck;
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const cohortId = searchParams.get("cohortId");

    // Validate pagination parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid page number" },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { success: false, message: "Invalid limit value" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Build query with optional cohortId filter
    let query = {};
    if (cohortId) {
      query = { "items.cohortId": cohortId };
    }
    // Get filtered orders with pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          total: totalOrders,
          page,
          limit,
          pages: Math.ceil(totalOrders / limit),
        },
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
