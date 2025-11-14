import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import { Course as CourseType } from "@/app/features/courses/slice/courseSlice";
export async function getCoursesFromDb() {
  await dbConnect();
  const courses = await Course.find({}).lean();
  return JSON.parse(JSON.stringify(courses));
}

export async function getCourseBySlug(
  slug: string
): Promise<CourseType | null> {
  await dbConnect();
  // console.log("Getting course by slug:", slug);
  const course = (await Course.findOne({ slug }).lean()) as CourseType | null;
  return JSON.parse(JSON.stringify(course));
}
