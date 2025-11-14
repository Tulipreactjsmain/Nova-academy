import { createAppSlice } from "@/lib/createAppSlice";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

export interface Cohort {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  nextStartDate?: string;
  status: "active" | "completed" | "upcoming";
  instructors: string[];
  enrolledStudents: number;
  courses: {
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
  }[];
  createdAt?: string;
  updatedAt?: string;
}

interface AllCohortsResponse {
  data: Cohort[];
  pagination: { page: number; pages: number; total: number };
  success: boolean;
}

interface AllCohortState {
  cohorts: Cohort[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AllCohortState = {
  cohorts: [],
  status: "idle",
  error: null,
};

export const allCohortSlice = createAppSlice({
  name: "allCohorts",
  initialState,
  reducers: (create) => ({
    fetchAllCohorts: create.asyncThunk(
      async () => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : process.env.NEXT_PUBLIC_LOCAL_API_URL;
        const response = await axios.get<AllCohortsResponse>(
          `${baseUrl}/api/cohorts/admin`
        );
        return response.data.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<Cohort[]>) => {
          state.status = "succeeded";
          state.cohorts = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch cohorts";
        },
      }
    ),
  }),
  selectors: {
    selectAllCohorts: (state) => state.cohorts,
    selectCohortsStatus: (state) => state.status,
    selectCohortsError: (state) => state.error,
  },
});

export const { fetchAllCohorts } = allCohortSlice.actions;
export const { selectAllCohorts, selectCohortsStatus, selectCohortsError } =
  allCohortSlice.selectors;

export default allCohortSlice;
