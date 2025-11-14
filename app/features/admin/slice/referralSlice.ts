import { createAppSlice } from "@/lib/createAppSlice";
import axios, { AxiosError } from "axios";
import { showToast } from "@/app/utils/toasts";

export interface ReferralCode {
  _id: string;
  codeName: string;
  discountType: "fixed" | "percentage";
  codeType: "referral" | "discount";
  discountValue: number;
  referralPrice?: number;
  description: string;
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
    _id: string;
  }>;
  createdAt?: string;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

interface CreateReferralState {
  codes: ReferralCode[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface GetReferralState {
  codes: ReferralCode[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialCreateReferralState: CreateReferralState = {
  codes: [],
  status: "idle",
  error: null,
};

const initialGetReferralState: GetReferralState = {
  codes: [],
  status: "idle",
  error: null,
};

export const referralSlice = createAppSlice({
  name: "referral",
  initialState: {
    create: initialCreateReferralState,
    get: initialGetReferralState,
  },
  reducers: (create) => ({
    createReferralCode: create.asyncThunk(
      async (codeData: {
        codeName: string;
        discountType?: string;
        codeType: string;
        discountValue?: number;
        referralPrice?: number;
        description: string;
        expiryDate: string;
        usageLimit: number;
      }, thunkAPI: any) => {
        try {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_API_URL
            : "http://localhost:3000";
          const response = await axios.post(
            `${baseUrl}/api/referral/admin/create-code`,
            codeData,
          );
          return response.data.code;
        } catch (error: any) {
          if (error.response?.data) {
            return thunkAPI.rejectWithValue(error.response.data);
          }
          throw error;
        }
      },
      {
        pending: (state) => {
          state.create.status = "loading";
          state.create.error = null;
        },
        fulfilled: (state, action) => {
          state.create.status = "succeeded";
          state.create.codes.push(action.payload);
          showToast("Referral code created successfully", "success");
        },
        rejected: (state, action) => {
          state.create.status = "failed";
          const errorPayload = action.payload as ErrorResponse;
          state.create.error =
            errorPayload?.message ??
            action.error.message ??
            "Failed to create referral code";
          showToast(state.create.error, "error");
        },
      }
    ),
    getReferralCodes: create.asyncThunk(
      async () => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : "http://localhost:3000";
        const response = await axios.get(
          `${baseUrl}/api/referral/admin/get-all-codes`,
        );
        return response.data.referralCode;
      },
      {
        pending: (state) => {
          state.get.status = "loading";
          state.get.error = null;
        },
        fulfilled: (state, action) => {
          state.get.status = "succeeded";
          state.get.codes = action.payload;
        },
        rejected: (state, action) => {
          state.get.status = "failed";
          const errorPayload = action.payload as ErrorResponse;
          state.get.error =
            errorPayload?.message ??
            action.error.message ??
            "Failed to fetch referral codes";
        },
      }
    ),
  }),
  selectors: {
    selectGetCodes: (state) => state.get.codes,
    selectGetStatus: (state) => state.get.status,
    selectGetError: (state) => state.get.error,
    selectCreateCodes: (state) => state.create.codes,
    selectCreateStatus: (state) => state.create.status,
    selectCreateError: (state) => state.create.error,
  },
});

export const { createReferralCode, getReferralCodes } = referralSlice.actions;
export const { selectGetCodes, selectGetStatus, selectGetError, selectCreateCodes, selectCreateStatus, selectCreateError } = referralSlice.selectors;
