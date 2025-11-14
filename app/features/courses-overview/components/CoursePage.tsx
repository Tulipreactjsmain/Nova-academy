"use client";
import React, { useState } from "react";
import CourseOverview from "./CourseOverview";
import CourseDetails from "./CourseDetails";
import CoursePricing from "./CoursePricing";
import CohortSelector from "./CohortSelector";
import { Layout } from "@/app/components";
import { Course } from "@/app/features/courses/slice/courseSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  setSelectedCohort,
  selectValidCohorts,
  selectSelectedCohortForCourse,
} from "@/app/features/cohorts/slice/cohortSlice";

interface CoursePageProps {
  course: Course;
}

const CoursePage: React.FC<CoursePageProps> = ({ course }) => {
  const dispatch = useAppDispatch();
  const selectedCohortId = useAppSelector((state) =>
    selectSelectedCohortForCourse(state, course._id)
  );
  const cohorts = useAppSelector(selectValidCohorts);

  const selectedCohort =
    cohorts.find((cohort) => cohort._id === selectedCohortId) || null;

  const handleCohortSelect = (cohortId: string) => {
    dispatch(setSelectedCohort({ courseId: course._id, cohortId }));
  };

  const { duration, modeOfLearning, skillLevel, requirements, instructors } =
    course;
  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <Layout className="py-[4.25rem] md:py-[8.5rem]">
      <div className="max-w-full ">
        {/* Loop through each course to render the sections */}
        <div key={course._id} className="mb-16">
          {/* Course Overview Section */}
          <div className="mb-[120px]">
            <h1 className="text-blue-80 text-5xl pb-[1.25rem] border-b-4 border-yellow-base mb-5">
              Course Overview
            </h1>
            <CourseOverview
              overview={course.description}
              learningOutcomes={course.learningOutcomes}
            />
          </div>

          <div className="mb-[120px]">
            {/* Course Details Section */}
            <h1 className="text-blue-80 text-5xl pb-[1.25rem] border-b-4 border-yellow-base mb-5 mt-12">
              Course Details
            </h1>
            <CourseDetails
              details={{
                duration,
                mode: modeOfLearning,
                skillLevel,
                requirements,
                instructor: instructors,
                certificate: "",
                projects: "",
                classFrequency: "",
              }}
            />
          </div>

          <div className="mb-[120px]">
            <h1 className="text-blue-80 text-5xl pb-[1.25rem] border-b-4 border-yellow-base mb-5 mt-12">
              Available Cohorts
            </h1>
            <CohortSelector
              courseId={course._id}
              onCohortSelect={handleCohortSelect}
            />
          </div>

          <div className="mb-[120px]">
            {/* Course Pricing Section */}
            <h1 className="text-blue-80 text-5xl pb-[1.25rem] border-b-4 border-yellow-base mb-5 mt-12">
              Course Pricing
            </h1>
            <CoursePricing course={course} selectedCohort={selectedCohort} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;
