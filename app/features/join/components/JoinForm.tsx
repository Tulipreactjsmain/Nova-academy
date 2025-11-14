"use client";

import React, { useState } from "react";
import axios from "axios";
import { BsCloudUpload } from "react-icons/bs";
import { showToast } from "@/app/utils/toasts";
import { FullPageLoader } from "@/app/components";

type Role =
  | "tutor"
  | "mentor"
  | "content_creator"
  | "community_manager"
  | "other";

export default function JoinForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    customRole: "",
    background: "",
    motivation: "",
    portfolio: "",
    resume: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const roles: { value: Role; label: string }[] = [
    { value: "tutor", label: "Course Tutor" },
    { value: "mentor", label: "Industry Mentor" },
    { value: "content_creator", label: "Content Creator" },
    { value: "community_manager", label: "Community Manager" },
    { value: "other", label: "Other Role" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      setFormData({ ...formData, resume: file });
    } else {
      showToast("Please upload a file smaller than 5MB", "error");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData({ ...formData, resume: file });
    } else {
      showToast("Please upload a file smaller than 5MB", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSubmit.append(key, value);
      }
    });

    try {
      await axios.post("/api/join-mission", formDataToSubmit);
      showToast("Application submitted successfully", "success");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        role: "",
        customRole: "",
        background: "",
        motivation: "",
        portfolio: "",
        resume: null,
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);

      // Handle validation errors
      if (error.response?.data?.message) {
        const validationErrors = error.response.data.message;

        // If it's an array of validation errors
        if (Array.isArray(validationErrors)) {
          const errorMessage = validationErrors
            .map((err) => {
              // Handle Zod validation error format
              if (err.path) {
                return `${err.path.join(".")}: ${err.message}`;
              }
              return err.message || "Validation error";
            })
            .join("\n");

          showToast(errorMessage, "error");
        } else {
          // If it's a single error message
          showToast(validationErrors, "error");
        }
      } else {
        showToast("Failed to submit application. Please try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-2xl shadow-sm"
      >
        <div className="space-y-4">
          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Interested Role
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="">Select a role (or specify below)</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>

            {/* Custom Role Input */}
            <input
              type="text"
              placeholder="Specify your role or area of interest"
              className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.customRole}
              onChange={(e) =>
                setFormData({ ...formData, customRole: e.target.value })
              }
            />
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Tell us about your background
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.background}
              onChange={(e) =>
                setFormData({ ...formData, background: e.target.value })
              }
              placeholder="Share your experience, skills, and achievements..."
            />
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Why do you want to join our mission?
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.motivation}
              onChange={(e) =>
                setFormData({ ...formData, motivation: e.target.value })
              }
              placeholder="Tell us what motivates you to join and what you hope to achieve..."
            />
          </div>

          {/* Portfolio Link */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Portfolio/LinkedIn/GitHub (Optional)
            </label>
            <input
              type="url"
              className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.portfolio}
              onChange={(e) =>
                setFormData({ ...formData, portfolio: e.target.value })
              }
              placeholder="https://"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Resume/CV (Optional)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-blue-100 hover:border-blue-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <BsCloudUpload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <p className="text-sm text-blue-900">
                {formData.resume
                  ? formData.resume.name
                  : "Drag and drop your resume here, or click to select"}
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Maximum file size: 5MB (PDF, DOC, DOCX)
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-shadow"
        >
          Submit Application
        </button>
      </form>
    </>
  );
}
