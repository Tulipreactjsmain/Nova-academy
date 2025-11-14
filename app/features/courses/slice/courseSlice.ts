import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Course {
  _id: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  duration: string;
  modeOfLearning: string;
  skillLevel: string;
  requirements: string;
  instructors?: string;
  price: {
    current: number;
    original?: number;
  };
  image: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CourseState {
  courses: Course[];
  status: "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  status: "loading",
  error: null,
};

export const courseSlice = createAppSlice({
  name: "courses",
  initialState,
  reducers: (create) => ({
    fetchCourses: create.asyncThunk(
      async (_: void, thunkAPI: any): Promise<Course[]> => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : process.env.NEXT_PUBLIC_LOCAL_API_URL;
        const response = await axios.get(`${baseUrl}/api/course`);
        // Sort courses by createdAt date, latest first
        const sortedCourses = response.data.sort((a: Course, b: Course) => {
          return (
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
          );
        });

        return sortedCourses;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.courses = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Failed to fetch courses";
        },
      }
    ),
    addCourse: create.reducer((state, action: PayloadAction<Course>) => {
      state.courses.unshift(action.payload);
    }),
    updateCourseInState: create.reducer(
      (state, action: PayloadAction<Course>) => {
        console.log("Updating course:", action.payload);
        const index = state.courses.findIndex(
          (course) => course._id?.toString() === action.payload._id?.toString()
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
          console.log("Course updated in state");
        } else {
          console.log("Course not found in state");
        }
        return state;
      }
    ),
    removeCourse: create.reducer((state, action: PayloadAction<string>) => {
      console.log("Removing course with id:", action.payload);
      const initialLength = state.courses.length;
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
      console.log("Courses after removal:", state.courses.length);
      if (state.courses.length === initialLength) {
        console.log("No course was removed");
      }
      return state;
    }),
  }),
  selectors: {
    selectCourses: (state) => state.courses,
    selectCoursesStatus: (state) => state.status,
    selectCoursesError: (state) => state.error,
  },
});

export const { fetchCourses, addCourse, updateCourseInState, removeCourse } =
  courseSlice.actions;
export const { selectCourses, selectCoursesStatus, selectCoursesError } =
  courseSlice.selectors;
