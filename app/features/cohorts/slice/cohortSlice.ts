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
    courseId: string | null;
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
  }[];
  createdAt?: string;
  updatedAt?: string;
}

interface CohortState {
  validCohorts: Cohort[];
  selectedCohorts: { [courseId: string]: string }; // Map of courseId to cohortId
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CohortState = {
  validCohorts: [],
  selectedCohorts: {},
  status: "loading",
  error: null,
};

export const cohortSlice = createAppSlice({
  name: "cohorts",
  initialState,
  reducers: (create) => ({
    fetchValidCohorts: create.asyncThunk(
      async () => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : process.env.NEXT_PUBLIC_LOCAL_API_URL;

        const response = await axios.get(`${baseUrl}/api/cohorts?valid=true`);
        return response.data.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.validCohorts = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Failed to fetch cohorts";
        },
      }
    ),
    setSelectedCohort: create.reducer(
      (
        state,
        action: PayloadAction<{ courseId: string; cohortId: string }>
      ) => {
        state.selectedCohorts[action.payload.courseId] =
          action.payload.cohortId;
      }
    ),
  }),
  selectors: {
    selectValidCohorts: (state) => state.validCohorts,
    selectCohortsStatus: (state) => state.status,
    selectCohortsError: (state) => state.error,
    selectSelectedCohortForCourse: (state, courseId: string) =>
      state.selectedCohorts[courseId] || null,
  },
});

export const { fetchValidCohorts, setSelectedCohort } = cohortSlice.actions;
export const {
  selectValidCohorts,
  selectCohortsStatus,
  selectCohortsError,
  selectSelectedCohortForCourse,
} = cohortSlice.selectors;
