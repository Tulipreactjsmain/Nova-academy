import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import verifyToken from "@/middlewares/verifyToken";
import adminOnly from "@/middlewares/adminOnly";

export async function POST(req: NextRequest) {
  try {
    // Verify the token
    const tokenVerification = await verifyToken(req);
    if (!tokenVerification.ok) {
      return tokenVerification; // Return the NextResponse from verifyToken directly
    }

    // Check if the user is an admin
    const adminCheck = await adminOnly(req);
    if (!adminCheck.ok) {
      return adminCheck; // Return the NextResponse from adminOnly directly
    }

    // Connect to the database
    await dbConnect();

    // Parse the request body
    const data = await req.json();

    // Create a new course
    const result = await Course.create(data);

    // Return the response
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: unknown) {
    // Handle errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong.",
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }
}
