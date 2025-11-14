import React from "react";
import { EclipseCirclesLayout, Nav } from "@/app/components";
import CoursesHeroSection from "@/app/features/courses-overview/components/HeroSection";
import CoursePage from "@/app/features/courses-overview/components/CoursePage";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/getCourses";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import { Course as CourseType } from "@/app/features/courses/slice/courseSlice";

async function getCourse(slug: string): Promise<CourseType | null> {
  try {
    const course = await getCourseBySlug(slug);
    if (!course) return null;

    return {
      ...course,
      _id: course._id,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

export async function generateStaticParams() {
  await dbConnect();
  const courses = await Course.find({}).select("slug").lean();

  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourse(params.slug);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The course you are looking for does not exist.",
    };
  }

  return { title: course.title, description: course.description };
}

export default async function CoursesOverview({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourse(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Nav navbarIsColored={true} />
      <EclipseCirclesLayout midLeftEclipse1 lastRightEclipse>
        <CoursesHeroSection course={course} />
        <CoursePage course={course} />
      </EclipseCirclesLayout>
    </>
  );
}
