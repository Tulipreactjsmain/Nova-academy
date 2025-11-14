import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchAllCohorts,
  selectAllCohorts,
  selectCohortsError,
  selectCohortsStatus,
} from "../slice/allCohortSlice";
import { useEffect } from "react";
import formatDate from "@/app/utils/formatDate";

export default function CohortList() {
  const dispatch = useAppDispatch();
  const cohorts = useAppSelector(selectAllCohorts);
  const status = useAppSelector(selectCohortsStatus);
  const error = useAppSelector(selectCohortsError);

  useEffect(() => {
    dispatch(fetchAllCohorts());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mt-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cohorts.map((cohort) => (
            <div
              key={cohort._id}
              onClick={() => {}}
              className={`
              group relative rounded-xl shadow-md hover:shadow-md 
              transition-all duration-300 p-6 cursor-pointer
            `}
            >
              <div className="absolute top-0 right-0 mt-4 mr-4">
                <span
                  className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  cohort.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              `}
                >
                  {cohort.status === "active" ? "Active" : "Upcoming"}
                </span>
              </div>

              <h4 className="font-semibold text-xl text-blue-80 mb-3 pr-20">
                {cohort.name}
              </h4>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-500">
                    {formatDate(cohort.startDate)} - {formatDate(cohort.endDate)}
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="text-sm">{cohort.instructors.join(", ")}</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
