import React from "react";
import { HeroLayout, Layout } from "@/app/components";
import { Course } from "@/app/features/courses/slice/courseSlice";

interface CoursesHeroSectionProps {
  course: Course;
}
export default function CoursesHeroSection({
  course,
}: CoursesHeroSectionProps) {
  return (
    <>
      <HeroLayout heroImage={course.image}>
        <Layout>
          <div className="w-full  pt-[15vh]  pb-[5vh]">
            <div className="mt-10 py-[1rem] md:py-[2rem] w-fit px-10 bg-[#5C5C5C4D]/20 backdrop-blur-md rounded-lg border-[1px] border-[#FFFDFD]/30">
              <h1 className="text-5xl text-white text-center">
                {course.title}
              </h1>
            </div>
          </div>
        </Layout>
      </HeroLayout>
    </>
  );
}
