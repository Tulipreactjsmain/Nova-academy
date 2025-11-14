"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components";
import { createCourse } from "@/app/features/admin/slice/courseManagementSlice";
import { useAppDispatch } from "@/lib/hooks";
import { showToast } from "@/app/utils/toasts";
import { generateRandomCourseData } from "@/app/utils/generateRandomData";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCourseModal({
  isOpen,
  onClose,
}: CreateCourseModalProps) {
  const dispatch = useAppDispatch();
  const [courseData, setCourseData] = useState(generateRandomCourseData());
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setCourseData(generateRandomCourseData());
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      price: { ...prev.price, [name]: parseFloat(value) },
    }));
  };

  const handleLearningOutcomesChange = (index: number, value: string) => {
    const newOutcomes = [...courseData.learningOutcomes];
    newOutcomes[index] = value;
    setCourseData((prev) => ({ ...prev, learningOutcomes: newOutcomes }));
  };

  const addLearningOutcome = () => {
    setCourseData((prev) => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, ""],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseData) {
      dispatch(createCourse(courseData));
      showToast("Course created successfully", "success");
      onClose();
    } else {
      showToast("Failed to create course", "error");
    }
  };

  if (!isRendered) return null;

  return (
    <div
      data-lenis-prevent
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end items-stretch z-[5000] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-8 w-full max-w-md h-full overflow-y-auto transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
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
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
