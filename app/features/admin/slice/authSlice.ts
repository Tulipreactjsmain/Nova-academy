import { createAppSlice } from "@/lib/createAppSlice";
import axios from "axios";

interface AdminState {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: AdminState = {
  isAuthenticated: false,
  message: null,
  status: "idle",
  error: null,
};

export const authSlice = createAppSlice({
  name: "admin",
  initialState,
  reducers: (create) => ({
    login: create.asyncThunk(
      async (credentials: { username: string; password: string }, thunkAPI: any) => {
        const response = await axios.post("/api/auth/login", credentials);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.message = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Login failed";
        },
      }
    ),
    logout: create.reducer((state) => {
      state.isAuthenticated = false;
      state.message = null;
      state.status = "idle";
      state.error = null;
    }),
  }),
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectMessage: (state) => state.message,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { login, logout } = authSlice.actions;
export const { selectIsAuthenticated, selectMessage, selectStatus, selectError } =
  authSlice.selectors;
