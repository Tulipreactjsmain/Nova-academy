import { createAppSlice } from "@/lib/createAppSlice";
import axios from "axios";

interface OrderState {
  orders: Order[];
  pagination: Pagination;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  },
  status: "loading",
  error: null,
};

export const orderSlice = createAppSlice({
  name: "orders",
  initialState,
  reducers: (create) => ({
    fetchOrders: create.asyncThunk(
      async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : process.env.NEXT_PUBLIC_LOCAL_API_URL;

        const response = await axios.get<OrdersResponse>(
          `${baseUrl}/api/orders/admin?page=${page}&limit=${limit}`
        );
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.orders = action.payload.data?.orders || [];
          state.pagination = action.payload.data?.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            pages: 0,
          };
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "Failed to fetch orders";
        },
      }
    ),
  }),
  selectors: {
    selectOrders: (state) => state.orders,
    selectPagination: (state) => state.pagination,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { fetchOrders } = orderSlice.actions;
export const { selectOrders, selectPagination, selectStatus, selectError } =
  orderSlice.selectors;
