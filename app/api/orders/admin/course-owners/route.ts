import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import verifyToken from "@/middlewares/verifyToken";
import adminOnly from "@/middlewares/adminOnly";

interface CourseOwnersResponse {
  success: boolean;
  data?: {
    owners: Array<{
      email: string;
      purchaseDate: Date;
    }>;
    courseTitle: string;
    totalOwners: number;
  };
  message?: string;
  error?: string;
}

export const dynamic = "force-dynamic";

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
    const courseId = searchParams.get("courseId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!courseId || !startDate || !endDate) {
      return NextResponse.json<CourseOwnersResponse>(
        {
          success: false,
          message: "Missing required parameters",
        },
        { status: 400 }
      );
    }

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    startDateTime.setUTCHours(0, 0, 0, 0);
    endDateTime.setUTCHours(23, 59, 59, 999);

    const result = await Order.aggregate([
      // Match orders within date range and status
      {
        $match: {
          "items.courseId": courseId,
          status: "completed",
          createdAt: {
            $gte: startDateTime,
            $lte: endDateTime,
          },
        },
      },
      // Unwind the items array
      { $unwind: "$items" },
      // Match specific course
      {
        $match: {
          "items.courseId": courseId,
        },
      },
      // Unwind owners array
      { $unwind: "$items.owners" },
      // Group by owner email
      {
        $group: {
          _id: "$items.owners",
          purchaseDate: { $first: "$createdAt" },
          courseTitle: { $first: "$items.courseTitle" },
        },
      },
      // Format output
      {
        $project: {
          _id: 0,
          email: "$_id",
          purchaseDate: 1,
          courseTitle: 1,
        },
      },
    ]);

    if (!result.length) {
      return NextResponse.json<CourseOwnersResponse>({
        success: true,
        data: {
          owners: [],
          courseTitle: "Unknown Course",
          totalOwners: 0,
        },
      });
    }

    return NextResponse.json<CourseOwnersResponse>({
      success: true,
      data: {
        owners: result.map(({ email, purchaseDate }) => ({
          email,
          purchaseDate,
        })),
        courseTitle: result[0].courseTitle,
        totalOwners: result.length,
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching course owners:", error);
    if (error instanceof Error) {
      return NextResponse.json<CourseOwnersResponse>(
        {
          success: false,
          message: "Internal server error",
          error: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json<CourseOwnersResponse>(
      {
        success: false,
        message: "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
