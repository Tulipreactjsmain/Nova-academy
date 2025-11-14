"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReferralCodes,
  selectGetCodes,
  selectGetStatus,
  selectGetError,
} from "@/app/features/admin/slice/referralSlice";
import LoadingList from "@/app/features/admin/components/LoadingList";
import { motion } from "framer-motion";
import { Button } from "@/app/components";
import { BsPlus } from "react-icons/bs";
import { formatNigerianPrice } from "@/app/utils/formatPrice";
import formatDate from "@/app/utils/formatDate";

interface ReferralCodesViewProps {
  setIsCreateReferralModalOpen: (open: boolean) => void;
}

const ReferralCodesView: React.FC<ReferralCodesViewProps> = ({
  setIsCreateReferralModalOpen,
}) => {
  const dispatch = useDispatch();
  const codes = useSelector(selectGetCodes);
  const status = useSelector(selectGetStatus);
  const error = useSelector(selectGetError);
  const [filter, setFilter] = useState<"all" | "referral" | "discount">("all");

  useEffect(() => {
    dispatch(getReferralCodes() as any);
  }, [dispatch]);

  if (status === "loading") return <LoadingList />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const filteredCodes = codes.filter((code) =>
    filter === "all" ? true : code.codeType === filter
  );

  return (
    <div className="max-w-7xl mx-auto" data-lenis-prevent>
      <div className="flex flex-col space-y-4 lg:space-x-5  lg:space-y-0 lg:flex-row lg:justify-between lg:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-80 mb-2">
            Referral Codes
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and track your referral and discount codes
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-wrap sm:flex-nowrap rounded-lg border border-gray-200 p-1 bg-gray-50">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("referral")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === "referral"
                  ? "bg-white shadow-sm text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Referral
            </button>
            <button
              onClick={() => setFilter("discount")}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === "discount"
                  ? "bg-white shadow-sm text-yellow-600"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              Discount
            </button>
          </div>
          <Button
            onClick={() => setIsCreateReferralModalOpen(true)}
            isInnerBgWhite={true}
            innerBtnClassName="font-semibold"
            icon={<BsPlus size={32} />}
          >
            Create New Code
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCodes.sort((a, b) => new Date(b.createdAt || new Date()).getTime() - new Date(a.createdAt || new Date()).getTime()).map((code) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={code._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-80 mb-1">
                    {code.codeName}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {code.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      code.codeType === "referral"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {code.codeType === "referral" ? "Referral" : "Discount"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      code.discountType === "fixed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {code.discountType != null
                      ? code.discountType === "fixed"
                        ? "Fixed"
                        : "Percentage"
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {code.codeType === "referral" && (
                  <div className="bg-purple-50 p-3 rounded-lg ">
                    <div className="text-sm text-purple-600 font-medium">
                      Referral Price
                    </div>
                    <div className="text-lg font-bold text-purple-800">
                      {formatNigerianPrice(code.referralPrice) || 0}
                    </div>
                  </div>
                )}
                {code.codeType === "discount" && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">
                      Discount
                    </div>
                    <div className="text-lg font-bold text-blue-800">
                      {code.discountType === "percentage"
                        ? `${Math.round(code.discountValue * 100)}%`
                        : formatNigerianPrice(code.discountValue) || 0}
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 font-medium">Usage</div>
                  <div className="text-lg font-bold text-gray-800">
                    {code.usageCount} / {code.usageLimit}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 font-medium">
                    Expires
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {formatDate(code.expiryDate)}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-blue-80 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Usage History
                </h4>
                <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
                  {code.usageHistory.length === 0 ? (
                    <div className="text-gray-400 text-sm italic text-center py-2">
                      No usage yet
                    </div>
                  ) : (
                    code.usageHistory.map((usage) => (
                      <div
                        key={usage.orderId}
                        className="text-sm bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-gray-800">
                            Order #{usage.orderId}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {new Date(usage.usedAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-gray-600 mb-2">
                          Customer: {usage.customerName}
                        </div>
                        <div className="space-y-1">
                          {usage.courses.map((course) => (
                            <div 
                              key={`${usage.orderId}-${course.courseId}`}
                              className="flex justify-between items-center text-xs bg-white p-2 rounded"
                            >
                              <span className="text-gray-700 truncate max-w-[200px]">
                                {course.courseTitle}
                              </span>
                              <span className="text-blue-600 font-medium">
                                {course.quantity} {course.quantity === 1 ? "slot" : "slots"}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
                          <span className="text-gray-500">Total Slots:</span>
                          <span className="font-semibold text-blue-600">
                            {usage.totalQuantity}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReferralCodesView;
