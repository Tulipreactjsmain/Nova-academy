"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components";
import { Course } from "@/app/features/courses/slice/courseSlice";
import { useAppDispatch } from "@/lib/hooks";
import { showToast } from "@/app/utils/toasts";
import {
  updateCourse,
  deleteCourse,
} from "@/app/features/admin/slice/courseManagementSlice";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export default function EditCourseModal({
  isOpen,
  onClose,
  course,
}: EditCourseModalProps) {
  const [courseData, setCourseData] = useState<Course | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (course) {
      setCourseData(course);
    }
  }, [course]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) =>
      prev
        ? {
            ...prev,
            price: { ...prev.price, [name]: parseFloat(value) },
          }
        : null
    );
  };

  const handleLearningOutcomesChange = (index: number, value: string) => {
    setCourseData((prev) => {
      if (!prev) return null;
      const newOutcomes = [...prev.learningOutcomes];
      newOutcomes[index] = value;
      return { ...prev, learningOutcomes: newOutcomes };
    });
  };

  const addLearningOutcome = () => {
    setCourseData((prev) =>
      prev
        ? {
            ...prev,
            learningOutcomes: [...prev.learningOutcomes, ""],
          }
        : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseData) {
      dispatch(updateCourse(courseData));
      showToast("Course updated successfully", "success");
      onClose();
    }
  };

  const handleDelete = () => {
    if (courseData && courseData._id) {
      console.log("Dispatching deleteCourse with id:", courseData._id);
      dispatch(deleteCourse(courseData._id));
      showToast("Course deleted successfully", "success");
      onClose();
    } else {
      showToast("Failed to delete course", "error");
    }
  };

  if (!isOpen || !courseData) return null;

  return (
    <>
      <div
        data-lenis-prevent
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[5000]"
      >
        <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Learning Outcomes
              </label>
              {courseData.learningOutcomes.map((outcome, index) => (
                <input
                  key={index}
                  type="text"
                  value={outcome}
                  onChange={(e) =>
                    handleLearningOutcomesChange(index, e.target.value)
                  }
                  placeholder={`Learning Outcome ${index + 1}`}
                  className="w-full p-2 mb-2 border rounded"
                />
              ))}
              <Button
                onClick={addLearningOutcome}
                type="button"
                outerBtnClassName="mb-4"
              >
                Add Learning Outcome
              </Button>
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration
              </label>
              <input
                id="duration"
                type="text"
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="modeOfLearning"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mode of Learning
              </label>
              <input
                id="modeOfLearning"
                type="text"
                name="modeOfLearning"
                value={courseData.modeOfLearning}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="skillLevel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Skill Level
              </label>
              <input
                id="skillLevel"
                type="text"
                name="skillLevel"
                value={courseData.skillLevel}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="requirements"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Requirements
              </label>
              <input
                id="requirements"
                type="text"
                name="requirements"
                value={courseData.requirements}
                onChange={handleInputChange}
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
                name="instructors"
                value={courseData.instructors}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="current"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Price
              </label>
              <input
                id="current"
                type="number"
                name="current"
                value={courseData.price.current}
                onChange={handlePriceChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="original"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Original Price
              </label>
              <input
                id="original"
                type="number"
                name="original"
                value={courseData.price.original}
                onChange={handlePriceChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <input
                id="image"
                type="text"
                name="image"
                value={courseData.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Slug
              </label>
              <input
                id="slug"
                type="text"
                name="slug"
                value={courseData.slug}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit">Update Course</Button>
              <Button
                onClick={handleDelete}
                type="button"
                innerBtnClassName="bg-red-500 text-white"
              >
                Delete Course
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
