import { createAppSlice } from "@/lib/createAppSlice";
import axios from "axios";
import { fetchAllCohorts } from "./allCohortSlice";

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface CohortData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  instructors: string[];
  courses: Array<{
    courseId: string;
    maxSlots: number;
  }>;
}

interface CohortManagementState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CohortManagementState = {
  status: "idle",
  error: null,
};

export const cohortManagementSlice = createAppSlice({
  name: "cohortManagement",
  initialState,
  reducers: (create) => ({
    createCohort: create.asyncThunk(
      async (cohort: CohortData, thunkAPI: any) => {
        try {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_API_URL
              : "http://localhost:3000";
          const response = await axios.post(
            `${baseUrl}/api/cohorts/admin`,
            cohort,
            {
              headers: {
                "Content-Type": "application/json",
                "X-Timestamp": Date.now().toString(),
              },
            }
          );
          thunkAPI.dispatch(fetchAllCohorts());
          return response.data;
        } catch (error: any) {
          if (error.response?.data) {
            return thunkAPI.rejectWithValue(error.response.data);
          }
          throw error;
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "succeeded";
        },
        rejected: (state, action) => {
          state.status = "failed";
          const errorPayload = action.payload as ErrorResponse;
          state.error =
            errorPayload?.message ??
            action.error.message ??
            "Failed to create cohort";
        },
      }
    ),
  }),
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { createCohort } = cohortManagementSlice.actions;
export const { selectStatus, selectError } = cohortManagementSlice.selectors;
