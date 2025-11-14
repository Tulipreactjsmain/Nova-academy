"use client";

import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/app/components";
import { BsArrowRight, BsDownload } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import LoadingList from "@/app/features/admin/components/LoadingList";
import {
  selectAllCohorts,
  selectCohortsStatus,
  selectCohortsError,
  fetchAllCohorts,
  Cohort,
} from "@/app/features/admin/slice/allCohortSlice";
import formatDate from "@/app/utils/formatDate";

interface Course {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseDuration: string;
  courseSkillLevel: string;
  coursePrice: {
    current: number;
    original?: number;
  };
  maxSlots: number;
  availableSlots: number;
  enrolledStudents: string[];
}

type View = "list" | "details";

export default function CohortsView({
  setIsCreateCohortModalOpen,
}: {
  setIsCreateCohortModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const cohorts = useAppSelector(selectAllCohorts);
  const status = useAppSelector(selectCohortsStatus);
  const error = useAppSelector(selectCohortsError);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [currentView, setCurrentView] = useState<View>("list");

  useEffect(() => {
    dispatch(fetchAllCohorts());
  }, []);

  const handleCohortClick = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setCurrentView("details");
  };

  const handleBackToList = () => {
    setSelectedCohort(null);
    setCurrentView("list");
  };

  const handleDownloadCSV = (course: Course, cohortName: string) => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    csvContent += "Student Email\n";

    // Add data rows
    course.enrolledStudents.forEach((email) => {
      csvContent += `${email}\n`;
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${cohortName}_${course.courseId}_enrolled_students.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (status === "loading") return <LoadingList />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (cohorts.length === 0)
    return (
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
        <div className="text-gray-500">No cohorts found</div>
        <Button
          onClick={() => setIsCreateCohortModalOpen(true)}
          isInnerBgWhite={true}
          innerBtnClassName="font-semibold px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Create Cohort
        </Button>
      </div>
    );

  if (currentView === "details" && selectedCohort) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span className="text-xl">←</span> Back to Cohorts
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {selectedCohort.name}
            </h2>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCohort.status === "active"
                  ? "bg-green-100 text-green-700"
                  : selectedCohort.status === "upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {selectedCohort.status.charAt(0).toUpperCase() +
                selectedCohort.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cohort Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Cohort Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-gray-700">
                      {selectedCohort.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Start Date</p>
                      <p className="font-medium text-gray-700">
                        {formatDate(selectedCohort.startDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">End Date</p>
                      <p className="font-medium text-gray-700">
                        {formatDate(selectedCohort.endDate)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Instructors</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCohort.instructors.map((instructor, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                        >
                          {instructor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Total Enrolled Students
                    </p>
                    <p className="font-medium text-gray-700">
                      {selectedCohort.enrolledStudents}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Courses</h3>
              <div className="space-y-4">
                {selectedCohort.courses.map((course, index) => (
                  <div
                    key={course.courseId || index}
                    className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          {course.courseTitle || "N/A"}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {course.courseDescription || "N/A"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Duration</p>
                          <p className="font-medium text-gray-700">
                            {course.courseDuration || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Skill Level
                          </p>
                          <p className="font-medium text-gray-700">
                            {course.courseSkillLevel || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Max Slots
                          </p>
                          <p className="font-medium text-gray-700">
                            {course.maxSlots}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Available Slots
                          </p>
                          <p className="font-medium text-gray-700">
                            {course.availableSlots}
                          </p>
                        </div>
                      </div>

                      {course.enrolledStudents.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">
                            Enrolled Students
                          </p>
                          <div className="bg-white rounded-lg p-4 max-h-40 overflow-y-auto">
                            <ul className="space-y-1">
                              {course.enrolledStudents.map((email, idx) => (
                                <li key={idx} className="text-sm text-gray-700">
                                  {email}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-4">
                            <Button
                              onClick={() =>
                                handleDownloadCSV(course, selectedCohort.name)
                              }
                              isInnerBgWhite={true}
                              icon={<BsDownload className="mr-2" />}
                              innerBtnClassName="w-full font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 py-2.5 hover:bg-blue-50 rounded-lg transition-all duration-300"
                            >
                              Download Student List
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Cohorts
        </h2>
        <Button
          onClick={() => setIsCreateCohortModalOpen(true)}
          isInnerBgWhite={true}
          innerBtnClassName="font-semibold px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Create Cohort
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cohorts.map((cohort) => (
          <div
            key={cohort._id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {cohort.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {cohort.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                    <p className="font-semibold text-gray-700">
                      {formatDate(cohort.startDate)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">End Date</p>
                    <p className="font-semibold text-gray-700">
                      {formatDate(cohort.endDate)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cohort.status === "active"
                          ? "bg-green-100 text-green-700"
                          : cohort.status === "upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cohort.status.charAt(0).toUpperCase() +
                        cohort.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Instructors</span>
                    <span className="text-sm font-medium text-gray-700">
                      {cohort.instructors.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Students</span>
                    <span className="text-sm font-medium text-gray-700">
                      {cohort.enrolledStudents}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Courses</span>
                    <span className="text-sm font-medium text-gray-700">
                      {cohort.courses.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => handleCohortClick(cohort)}
                  isInnerBgWhite={true}
                  icon={<BsArrowRight className="ml-2" />}
                  innerBtnClassName="w-full font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 py-2.5 hover:bg-blue-50 rounded-lg transition-all duration-300"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
