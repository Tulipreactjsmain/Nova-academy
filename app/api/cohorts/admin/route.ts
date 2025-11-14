import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";
import Cohort from "@/models/Cohort";
import verifyToken from "@/middlewares/verifyToken";
import adminOnly from "@/middlewares/adminOnly";
import Course from "@/models/Course";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Token Validation
    const tokenVerification = await verifyToken(request);
    if (!tokenVerification.ok) {
      return tokenVerification;
    }

    // Admin Validation
    const adminCheck = await adminOnly(request);
    if (!adminCheck.ok) {
      return adminCheck;
    }

    // Validate Request Signature
    const timestampHeader = request.headers.get("X-Timestamp");
    if (!timestampHeader) {
      return NextResponse.json(
        { success: false, message: "Missing request signature" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await request.json();

    // Validate required fields
    if (
      !body.name?.trim() ||
      !body.startDate ||
      !body.endDate ||
      !body.courses?.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, startDate, endDate, and courses (array) are required",
        },
        { status: 400 }
      );
    }

    if (new Date(body.startDate) >= new Date(body.endDate)) {
      return NextResponse.json(
        { success: false, message: "Start date must be before end date" },
        { status: 400 }
      );
    }

    // Check for overlapping cohorts
    // const overlappingCohort = await Cohort.findOne({
    //   $or: [
    //     // Check if new cohort's start date falls within an existing cohort's range
    //     {
    //       startDate: { $lte: new Date(body.startDate) },
    //       endDate: { $gte: new Date(body.startDate) },
    //     },
    //     // Check if new cohort's end date falls within an existing cohort's range
    //     {
    //       startDate: { $lte: new Date(body.endDate) },
    //       endDate: { $gte: new Date(body.endDate) },
    //     },
    //     // Check if new cohort completely encompasses an existing cohort
    //     {
    //       startDate: { $gte: new Date(body.startDate) },
    //       endDate: { $lte: new Date(body.endDate) },
    //     },
    //   ],
    //   status: { $in: ["active", "upcoming"] }, // Only check against active and upcoming cohorts
    // });

    // if (overlappingCohort) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: `Cannot create cohort: Date range overlaps with existing cohort "${
    //         overlappingCohort.name
    //       }" (${new Date(
    //         overlappingCohort.startDate
    //       ).toLocaleDateString()} - ${new Date(
    //         overlappingCohort.endDate
    //       ).toLocaleDateString()})`,
    //     },
    //     { status: 400 }
    //   );
    // }

    // Validate and enrich course data
    const enrichedCourses = await Promise.all(
      body.courses.map(
        async (course: { courseId: string; maxSlots: number }) => {
          if (!Types.ObjectId.isValid(course.courseId)) {
            throw new Error(`Invalid course ID format: ${course.courseId}`);
          }

          if (!course.maxSlots || course.maxSlots < 1) {
            throw new Error(`Invalid maxSlots for course: ${course.courseId}`);
          }

          // Validate course exists and capture its current data
          const existingCourse = await Course.findById(course.courseId);
          if (!existingCourse) {
            throw new Error(`Course not found: ${course.courseId}`);
          }

          // Return enriched course object with stored course data
          return {
            courseId: new Types.ObjectId(course.courseId),
            courseTitle: existingCourse.title,
            courseDescription: existingCourse.description,
            courseDuration: existingCourse.duration,
            courseSkillLevel: existingCourse.skillLevel,
            coursePrice: {
              current: existingCourse.price.current,
              original: existingCourse.price.original,
            },
            enrolledStudents: [],
            maxSlots: course.maxSlots,
            availableSlots: course.maxSlots,
          };
        }
      )
    );

    // Create Cohort with enriched course data
    const cohort = await Cohort.create({
      name: body.name.trim(),
      description: body.description || "",
      startDate: body.startDate,
      endDate: body.endDate,
      nextStartDate: body.nextStartDate || null,
      status: body.status || "upcoming",
      instructors: body.instructors?.length ? body.instructors : ["TBA"],
      enrolledStudents: 0,
      courses: enrichedCourses,
    });

    return NextResponse.json({ success: true, data: cohort }, { status: 201 });
  } catch (error) {
    console.error("Error creating cohort:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Error creating cohort",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const tokenVerification = await verifyToken(req);
    if (!tokenVerification.ok) {
      return tokenVerification;
    }

    // Check if the user is an admin
    const adminCheck = await adminOnly(req);
    if (!adminCheck.ok) {
      return adminCheck;
    }

    await connectToDatabase();

    const cohorts = await Cohort.find().sort({ startDate: -1 });

    if (cohorts.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "No cohorts found",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      data: cohorts,
      total: cohorts.length,
    });
  } catch (error) {
    console.error("Error fetching cohorts:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Error fetching cohorts",
      },
      { status: 500 }
    );
  }
}
