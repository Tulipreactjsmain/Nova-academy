import { createAppSlice } from "@/lib/createAppSlice";
import axios from "axios";

interface CohortMember {
  email: string;
  purchaseDate: Date;
}

interface CohortMembersState {
  members: CohortMember[];
  courseTitle: string;
  totalMembers: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CohortMembersState = {
  members: [],
  courseTitle: "",
  totalMembers: 0,
  status: "idle",
  error: null
};

export const cohortMembersSlice = createAppSlice({
  name: "cohortMembers",
  initialState,
  reducers: (create) => ({
    fetchCohortMembers: create.asyncThunk(
      async ({ 
        courseId, 
        startDate, 
        endDate 
      }: { 
        courseId: string; 
        startDate: string; 
        endDate: string;
      }) => {
        const baseUrl = process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_API_URL
          : process.env.NEXT_PUBLIC_LOCAL_API_URL;
          
        const response = await axios.get(
          `${baseUrl}/api/orders/admin/course-owners?courseId=${courseId}&startDate=${startDate}&endDate=${endDate}`
        );
        console.log("response.data", response.data);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.members = action.payload.data?.owners || [];
          state.courseTitle = action.payload.data?.courseTitle || "Unknown Course";
          state.totalMembers = action.payload.data?.totalOwners || 0;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Failed to fetch cohort members";
        },
      }
    ),
  }),
  selectors: {
    selectMembers: (state) => state.members,
    selectCourseTitle: (state) => state.courseTitle,
    selectTotalMembers: (state) => state.totalMembers,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { fetchCohortMembers } = cohortMembersSlice.actions;
export const {
  selectMembers,
  selectCourseTitle,
  selectTotalMembers,
  selectStatus,
  selectError,
} = cohortMembersSlice.selectors; 