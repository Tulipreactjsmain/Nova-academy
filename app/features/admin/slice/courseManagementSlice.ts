import { createAppSlice } from "@/lib/createAppSlice";
import { Course } from "@/app/features/courses/slice/courseSlice";
import axios from "axios";
import {
  addCourse,
  updateCourseInState,
  removeCourse,
} from "@/app/features/courses/slice/courseSlice";

interface CourseManagementState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseManagementState = {
  status: "idle",
  error: null,
};

export const courseManagementSlice = createAppSlice({
  name: "courseManagement",
  initialState,
  reducers: (create) => ({
    createCourse: create.asyncThunk(
      async (course: Omit<Course, "_id">, thunkAPI: any) => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : "http://localhost:3000";
        const response = await axios.post(
          `${baseUrl}/api/course/admin`,
          course
        );
        const createdCourse = response.data.data;
        thunkAPI.dispatch(addCourse(createdCourse));
        return createdCourse;
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
          state.error = action.error.message ?? "Failed to create course";
        },
      }
    ),
    updateCourse: create.asyncThunk(
      async (course: Course, thunkAPI: any) => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : process.env.NEXT_PUBLIC_LOCAL_API_URL;
        const response = await axios.patch(
          `${baseUrl}/api/course/admin/${course._id}`,
          course
        );
        thunkAPI.dispatch(updateCourseInState(response.data.data));
        return response.data.data;
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
          state.error = action.error.message ?? "Failed to update course";
        },
      }
    ),
    deleteCourse: create.asyncThunk(
      async (courseId: string, thunkAPI: any) => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : process.env.NEXT_PUBLIC_LOCAL_API_URL;
        await axios.delete(`${baseUrl}/api/course/admin/${courseId}`);
        thunkAPI.dispatch(removeCourse(courseId));
        return courseId;
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
          state.error = action.error.message ?? "Failed to delete course";
        },
      }
    ),
  }),
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { createCourse, updateCourse, deleteCourse } =
  courseManagementSlice.actions;
export const { selectStatus, selectError } = courseManagementSlice.selectors;
