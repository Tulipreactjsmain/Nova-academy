import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";
import Cohort from "@/models/Cohort";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = request.nextUrl;
    const cohortId = searchParams.get("cohortId");
    const validCohorts = searchParams.get("valid");

    // Get all valid cohorts (not ended)
    if (validCohorts) {
      const now = new Date();
      const cohorts = await Cohort.find({
        endDate: { $gte: now },
      })
        .select("-courses.enrolledStudents") // Still exclude sensitive data
        .sort({ startDate: 1 });

      return NextResponse.json({
        success: true,
        data: cohorts,
      });
    }

    // Fetch Single Cohort by ID
    if (cohortId) {
      if (!Types.ObjectId.isValid(cohortId)) {
        return NextResponse.json(
          { success: false, message: "Invalid Cohort ID" },
          { status: 400 }
        );
      }
      const cohort = await Cohort.findById(cohortId).select(
        "-courses.enrolledStudents"
      );
      if (!cohort) {
        return NextResponse.json(
          { success: false, message: "Cohort not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: cohort });
    }

    // Fetch All Cohorts with Filters & Pagination
    const filters: any = {};

    const statusParam = searchParams.get("status");
    if (statusParam) {
      filters.status = statusParam;
    }

    const startDateParam = searchParams.get("startDate");
    if (startDateParam) {
      const parsedStartDate = new Date(startDateParam);
      if (!isNaN(parsedStartDate.getTime())) {
        filters.startDate = { $gte: parsedStartDate };
      }
    }

    const endDateParam = searchParams.get("endDate");
    if (endDateParam) {
      const parsedEndDate = new Date(endDateParam);
      if (!isNaN(parsedEndDate.getTime())) {
        filters.endDate = { $lte: parsedEndDate };
      }
    }

    // Pagination
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "10", 10), 1),
      100
    );
    const skip = (page - 1) * limit;

    // Query for all cohorts
    const cohorts = await Cohort.find(filters)
      .select("-courses.enrolledStudents")
      .skip(skip)
      .limit(limit)
      .sort(startDateParam ? { startDate: 1 } : { createdAt: -1 });

    const total = await Cohort.countDocuments(filters);

    return NextResponse.json({
      success: true,
      data: cohorts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching cohorts:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
