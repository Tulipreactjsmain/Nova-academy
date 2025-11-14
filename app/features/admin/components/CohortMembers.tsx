"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, InputField } from "@/app/components";
import {
  fetchCohortMembers,
  selectMembers,
  selectCourseTitle,
  selectTotalMembers,
  selectStatus,
  selectError,
} from "@/app/features/admin/slice/cohortMembersSlice";
import formatDate from "@/app/utils/formatDate";

interface CohortMembersProps {
  courseId: string;
  onBack: () => void;
}

export default function CohortMembers({
  courseId,
  onBack,
}: CohortMembersProps) {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectMembers);
  const courseTitle = useAppSelector(selectCourseTitle);
  const totalMembers = useAppSelector(selectTotalMembers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [shouldDownload, setShouldDownload] = useState(false);

  useEffect(() => {
    if (!shouldDownload) return;

    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    const csvContent = [
      ["Email", "Purchase Date"],
      ...members.map((member) => [
        member.email,
        new Date(member.purchaseDate).toISOString().split("T")[0],
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${courseTitle}-members-${formattedStartDate}-to-${formattedEndDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setShouldDownload(false);
  }, [shouldDownload, members, courseTitle, startDate, endDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchCohortMembers({ courseId, startDate, endDate }));
    setShowResults(true);
  };

  const handleDownload = () => {
    setShouldDownload(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-blue-80">
          {courseTitle || "Course"} - Cohort Members
        </h2>
        <button onClick={onBack} className="text-blue-80 hover:text-blue-60">
          Back to Courses
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-80 mb-2">
                Start Date
              </label>
              <InputField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                id="startDate"
                placeholder="Start Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-80 mb-2">
                End Date
              </label>
              <InputField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                id="endDate"
                placeholder="End Date"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Get Members</Button>
          </div>
        </form>
      </div>

      {showResults && status === "succeeded" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-medium text-blue-80">
              Total Members: {totalMembers}
            </h3>
            <Button onClick={handleDownload}>Download CSV</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-blue-80">
                    Purchase Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="text-gray-500">
                        {formatDate(member.purchaseDate.toLocaleDateString())}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-base"></div>
        </div>
      )}

      {status === "failed" && (
        <div className="bg-red-50 p-4 rounded-xl">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
