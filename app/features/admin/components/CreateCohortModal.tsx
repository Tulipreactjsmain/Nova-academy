"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components";
import { useAppDispatch } from "@/lib/hooks";
import {
  selectCourses,
  selectCoursesStatus,
  fetchCourses,
} from "@/app/features/courses/slice/courseSlice";
import { useSelector } from "react-redux";
import { generateRandomCohortData } from "@/app/utils/generateRandomData";
import {
  createCohort,
  selectStatus as selectCohortStatus,
} from "../slice/cohortManagementSlice";
import { showToast } from "@/app/utils/toasts";

interface CreateCohortModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCohortModal({
  isOpen,
  onClose,
}: CreateCohortModalProps) {
  const dispatch = useAppDispatch();
  const courses = useSelector(selectCourses);
  const coursesStatus = useSelector(selectCoursesStatus);
  const cohortStatus = useSelector(selectCohortStatus);
  const [formData, setFormData] = useState(generateRandomCohortData());
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && coursesStatus === "loading") {
      dispatch(fetchCourses());
    }
  }, [isOpen, coursesStatus, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseAdd = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [...prev.courses, { courseId: "", maxSlots: 50 }],
    }));
  };

  const handleCourseChange = (
    index: number,
    field: "courseId" | "maxSlots",
    value: string | number
  ) => {
    setFormData((prev) => {
      const newCourses = [...prev.courses];
      newCourses[index] = {
        ...newCourses[index],
        [field]: value,
      };
      return {
        ...prev,
        courses: newCourses,
      };
    });
  };

  const handleCourseRemove = (index: number) => {
    setFormData((prev) => {
      const newCourses = prev.courses.filter((_, i) => i !== index);
      return {
        ...prev,
        courses: newCourses,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cohortData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate + "T23:59:59.999Z").toISOString(),
      };

      const resultAction = await dispatch(createCohort(cohortData));

      if (createCohort.fulfilled.match(resultAction)) {
        showToast("Cohort created successfully!", "success");
        onClose();
      } else if (createCohort.rejected.match(resultAction)) {
        const errorData = resultAction.payload as { message: string };
        showToast(errorData?.message || "Failed to create cohort", "error");
        console.log(errorData);
      }
    } catch (err) {
      console.log(err);
      if (err && typeof err === "object" && "message" in err) {
        showToast(err.message as string, "error");
      } else {
        showToast("An error occurred", "error");
      }
    }
  };

  if (!isRendered) return null;

  return (
    <div
      data-lenis-prevent
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-[5000] isolate transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ isolation: "isolate" }}
      onClick={onClose}
    >
      <div
        className={`bg-white p-8 w-full max-w-md h-full overflow-y-auto transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Create New Cohort</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cohort Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              className="w-full p-2 border rounded"
              required
              placeholder="Enter cohort name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              name="description"
              className="w-full p-2 border rounded"
              placeholder="Enter cohort description"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              name="startDate"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              name="endDate"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="instructors"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Instructors
            </label>
            <input
              id="instructors"
              type="text"
              value={formData.instructors.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  instructors: e.target.value
                    .split(",")
                    .map((i) => i.trim())
                    .filter(Boolean),
                }))
              }
              name="instructors"
              className="w-full p-2 border rounded"
              placeholder="Enter instructor names, separated by commas"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Courses
            </label>
            <div className="space-y-2">
              {formData.courses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-2">
                    <select
                      value={course.courseId}
                      onChange={(e) =>
                        handleCourseChange(index, "courseId", e.target.value)
                      }
                      className="flex-1 p-2 border rounded"
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => handleCourseRemove(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Max Slots:
                    </label>
                    <input
                      type="number"
                      value={course.maxSlots}
                      onChange={(e) =>
                        handleCourseChange(
                          index,
                          "maxSlots",
                          parseInt(e.target.value)
                        )
                      }
                      className="flex-1 p-2 border rounded"
                      min="1"
                      required
                    />
                  </div>
                </div>
              ))}
              <Button type="button" onClick={handleCourseAdd}>
                Add Course
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={cohortStatus === "loading"}>
              {cohortStatus === "loading" ? "Creating..." : "Create Cohort"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
