import { createAppSlice } from "@/lib/createAppSlice";
import axios from "axios";
import { showToast } from "@/app/utils/toasts";

interface ReferralCode {
  id: string;
  codeName: string;
  codeType: "referral" | "discount";
  discountType?: "fixed" | "percentage";
  discountValue?: number | null;
  referralPrice?: number;
  description: string;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface VerifyCodeState {
  code: ReferralCode | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface CodeHistoryState {
  codeName: string;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  usageHistory: Array<{
    customerName: string;
    orderId: string;
    courses: Array<{
      courseId: string;
      courseTitle: string;
      quantity: number;
    }>;
    usedAt: string;
    totalQuantity: number;
  }>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialVerifyState: VerifyCodeState = {
  code: null,
  status: "idle",
  error: null,
};

const initialHistoryState: CodeHistoryState = {
  codeName: "",
  expiryDate: "",
  usageLimit: 0,
  usageCount: 0,
  usageHistory: [],
  status: "idle",
  error: null,
};

export const userReferralSlice = createAppSlice({
  name: "userReferral",
  initialState: {
    verify: initialVerifyState,
    history: initialHistoryState,
  },
  reducers: (create) => ({
    verifyCode: create.asyncThunk(
      async (codeName: string, thunkAPI: any) => {
        try {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_API_URL
              : "http://localhost:3000";
          const response = await axios.get(
            `${baseUrl}/api/referral/verify-code/${codeName}`
          );
          if (!response.data.success) {
            return thunkAPI.rejectWithValue({
              success: false,
              message: response.data.message || "Failed to verify referral code"
            });
          }
          return response.data.data.code;
        } catch (error: any) {
          if (error.response?.data) {
            return thunkAPI.rejectWithValue(error.response.data);
          }
          return thunkAPI.rejectWithValue({
            success: false,
            message: error.message || "Failed to verify referral code"
          });
        }
      },
      {
        pending: (state) => {
          state.verify.status = "loading";
          state.verify.error = null;
          state.verify.code = null;
        },
        fulfilled: (state, action) => {
          state.verify.status = "succeeded";
          state.verify.code = action.payload;
          state.verify.error = null;
        },
        rejected: (state, action) => {
          state.verify.status = "failed";
          state.verify.code = null;
          const errorPayload = action.payload as ErrorResponse;
          state.verify.error =
            errorPayload?.message ??
            action.error.message ??
            "Failed to verify referral code";
        },
      }
    ),
    getCodeHistory: create.asyncThunk(
      async (codeName: string, thunkAPI: any) => {
        try {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_API_URL
              : "http://localhost:3000";
          const response = await axios.get(
            `${baseUrl}/api/referral/get-usage/${codeName}`
          );
          return response.data.referralCode;
        } catch (error: any) {
          if (error.response?.data) {
            return thunkAPI.rejectWithValue(error.response.data);
          }
          throw error;
        }
      },
      {
        pending: (state) => {
          state.history.status = "loading";
          state.history.error = null;
        },
        fulfilled: (state, action) => {
          state.history.status = "succeeded";
          state.history = action.payload;
        },
        rejected: (state, action) => {
          state.history.status = "failed";
          const errorPayload = action.payload as ErrorResponse;
          state.history.error =
            errorPayload?.message ??
            action.error.message ??
            "Failed to fetch code history";
          showToast(state.history.error, "error");
        },
      }
    ),
    clearVerifyState: create.reducer((state) => {
      state.verify = initialVerifyState;
    }),
    clearHistoryState: create.reducer((state) => {
      state.history = initialHistoryState;
    }),
  }),
  selectors: {
    selectVerifiedCode: (state) => state.verify.code,
    selectVerifyStatus: (state) => state.verify.status,
    selectVerifyError: (state) => state.verify.error,
    selectHistory: (state) => state.history,
    selectHistoryStatus: (state) => state.history.status,
    selectHistoryError: (state) => state.history.error,
  },
});

export const {
  verifyCode,
  getCodeHistory,
  clearVerifyState,
  clearHistoryState,
} = userReferralSlice.actions;

export const {
  selectVerifiedCode,
  selectVerifyStatus,
  selectVerifyError,
  selectHistory,
  selectHistoryStatus,
  selectHistoryError,
} = userReferralSlice.selectors;
