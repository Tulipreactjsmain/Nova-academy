"use client";

import { Button } from "@/app/components";
import CourseList from "./CourseList";
import OrdersList from "./OrdersList";
import { Dispatch, SetStateAction } from "react";
import { Course } from "../../courses/slice/courseSlice";
import { AdminView } from "@/app/features/admin/types";
import CohortList from "./CohortList";

interface DashboardHomeProps {
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCourse: Dispatch<SetStateAction<Course | null>>;
  setCurrentView: Dispatch<SetStateAction<AdminView>>;
  setSelectedOrderId: Dispatch<SetStateAction<string | null>>;
  setIsCreateCohortModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardHome({
  setIsCreateModalOpen,
  setIsEditModalOpen,
  setSelectedCourse,
  setCurrentView,
  setSelectedOrderId,
  setIsCreateCohortModalOpen,
}: DashboardHomeProps) {
  return (
    <>
      <section>
        <OrdersList
          setCurrentView={setCurrentView}
          setSelectedOrderId={setSelectedOrderId}
        />
      </section>
      <section className="mb-8 md:mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-80">
            Courses
          </h2>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            isInnerBgWhite={true}
            innerBtnClassName="font-semibold"
          >
            Create Course
          </Button>
        </div>
        <CourseList
          setIsEditModalOpen={setIsEditModalOpen}
          setSelectedCourse={setSelectedCourse}
          slice={3}
          includeAllCoursesButton={true}
          setCurrentView={setCurrentView}
        />
      </section>
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-80">
            Cohorts
          </h2>
          <Button
            onClick={() => setIsCreateCohortModalOpen(true)}
            isInnerBgWhite={true}
            innerBtnClassName="font-semibold"
          >
            Create Cohort
          </Button>
        </div>
        <CohortList />
      </section>
    </>
  );
}
