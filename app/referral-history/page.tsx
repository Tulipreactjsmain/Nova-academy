"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getCodeHistory,
  selectHistory,
  selectHistoryStatus,
  selectHistoryError,
} from "@/app/features/referral/slice/userReferralSlice";
import FullPageLoader from "@/app/components/FullPageLoader";
import { Button, Nav } from "@/app/components";
import {
  BsSearch,
  BsClockHistory,
  BsPerson,
  BsBook,
  BsCalendar,
  BsX,
  BsCheckCircle,
  BsExclamationCircle,
} from "react-icons/bs";
import { motion } from "framer-motion";
import formatDate from "@/app/utils/formatDate";

export default function ReferralHistory() {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const status = useAppSelector(selectHistoryStatus);
  const error = useAppSelector(selectHistoryError);
  const [codeInput, setCodeInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (!codeInput.trim()) return;
    dispatch(getCodeHistory(codeInput));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearInput = () => {
    setCodeInput("");
  };

  // Progress bar calculation
  const totalUsageCount = history.usageCount;
  const progress = history.usageLimit
    ? Math.min(100, Math.round((totalUsageCount / history.usageLimit) * 100))
    : 0;
  const isExpired =
    history.expiryDate && new Date(history.expiryDate) < new Date();

  return (
    <>
      <Nav navbarIsColored />
      <div className="max-w-7xl mx-auto px-4 py-52">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-80">
              Referral Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Track your referral code usage and performance
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:min-w-[300px]">
              <div
                className={`
                relative flex items-center bg-white rounded-lg border transition-all duration-200
                ${
                  isFocused
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
              >
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter referral code to search..."
                  className="w-full py-3 px-4 bg-transparent border-none focus:border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-400"
                />
                {codeInput && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearInput}
                    className="p-2 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <BsX className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                <BsExclamationCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-800 font-medium">
                  Referral codes are case sensitive
                </p>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-6 left-0 text-sm text-red-500"
                >
                  {error}
                </motion.p>
              )}
            </div>
            <Button
              onClick={handleSearch}
              isInnerBgWhite={true}
              innerBtnClassName="w-fit h-fit"
              outerBtnClassName="h-fit"
              icon={<BsSearch className="w-5 h-5" />}
            >
              Search
            </Button>
          </div>
        </div>

        {status === "loading" && <FullPageLoader />}

        {/* Dashboard summary card */}
        {history.codeName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl shadow flex flex-col md:flex-row items-center justify-between gap-8 p-8"
          >
            <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-80">
                  {history.codeName}
                </span>
                {isExpired ? (
                  <span className="flex items-center gap-1 text-red-500 text-sm font-semibold">
                    <BsExclamationCircle className="w-4 h-4" /> Expired
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <BsCheckCircle className="w-4 h-4" /> Active
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <BsCalendar className="w-4 h-4" />
                  <span className="font-medium">Expiry:</span>
                  <span className="text-gray-900">
                    {formatDate(history.expiryDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BsBook className="w-4 h-4" />
                  <span className="font-medium">Usage:</span>
                  <span className="text-gray-900">
                    {totalUsageCount} / {history.usageLimit}
                  </span>
                </div>
              </div>
              <div className="w-full mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Usage Progress</span>
                  <span className="text-gray-700 font-semibold">
                    {progress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress < 80
                        ? "bg-blue-500"
                        : progress < 100
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[180px]">
              <span className="text-gray-600 text-sm">
                Referral Code Status
              </span>
              <span
                className={`text-lg font-bold ${
                  isExpired ? "text-red-500" : "text-green-600"
                }`}
              >
                {isExpired ? "Expired" : "Active"}
              </span>
            </div>
          </motion.div>
        )}

        {/* Usage history grid */}
        {!history ||
        !history.usageHistory ||
        history.usageHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
          >
            <BsClockHistory className="w-12 h-12 text-blue-80 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No referral history found</p>
            <p className="text-gray-500 mt-2">
              Enter a referral code to view its usage history
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {history.usageHistory.map((usage, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                key={usage.orderId}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-semibold">
                      Order #{usage.orderId}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <BsCalendar className="w-4 h-4" />
                      {formatDate(usage.usedAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsPerson className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 font-medium">
                      {usage.customerName}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4">
                  {usage.courses.map((course, courseIndex) => (
                    <div
                      key={`${usage.orderId}-${course.courseId}`}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg gap-4"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-bold text-blue-80">
                          {course.courseTitle}
                        </span>
                        <span className="text-gray-600 text-sm flex items-center gap-2">
                          <BsBook className="w-4 h-4" />
                          Course ID: {course.courseId}
                        </span>
                      </div>
                      <span className="text-blue-600 bg-blue-100 px-4 py-2 rounded-full text-sm font-semibold">
                        {course.quantity}{" "}
                        {course.quantity === 1 ? "Slot" : "Slots"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-600 text-sm">
                    Total Slots Used:
                  </span>
                  <span className="text-lg font-bold text-blue-80">
                    {usage.totalQuantity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
