import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const courses = await Course.find({});
  return NextResponse.json(courses, { status: 200 });
}
