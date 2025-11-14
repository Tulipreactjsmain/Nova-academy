import { showToast } from "@/app/utils/toasts";
import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/app/features/cart/types";
import { RootState } from "@/lib/store";

interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("_sa_unique_cart_items");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("_sa_unique_cart_items", JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: [],
};

type UpdateQuantityPayload = {
  itemId: string;
  quantity: number;
  removedIndex?: number;
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    initializeCart: create.reducer((state) => {
      state.items = loadCartFromLocalStorage();
    }),
    addToCart: create.reducer((state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          owners: [],
        });
      }
      saveCartToLocalStorage(state.items);
      showToast(`${action.payload.title} added to cart`, "success");
    }),
    removeFromCart: create.reducer((state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveCartToLocalStorage(state.items);
      showToast(`Item removed from cart`, "success");
    }),
    updateQuantity: create.asyncThunk(
      async (payload: UpdateQuantityPayload, { getState }) => {
        const state = getState() as RootState;
        const item = state.cart.items.find(
          (item) => item._id === payload.itemId
        );
        if (!item) return null;

        const cohort = state.cohorts.validCohorts.find(
          (c) => c._id === item.cohort._id
        );
        const cohortCourse = cohort?.courses.find(
          (course) => course.courseId === item._id
        );

        if (!cohortCourse || payload.quantity > cohortCourse.availableSlots) {
          showToast(
            `Only ${cohortCourse?.availableSlots || 0} slots available for ${
              item.title
            }`,
            "error"
          );
          return null;
        }

        return payload;
      },
      {
        fulfilled: (state, action) => {
          const payload = action.payload;
          if (!payload) return;

          const item = state.items.find((item) => item._id === payload.itemId);
          if (!item) return;

          item.quantity = payload.quantity;
          if (typeof payload.removedIndex === "number" && item.owners) {
            item.owners = item.owners.filter(
              (_, index) => index !== payload.removedIndex
            );
          }
          saveCartToLocalStorage(state.items);
        },
      }
    ),
    updateOwners: create.reducer(
      (
        state,
        action: PayloadAction<{ courseId: string; owners: string[] }>
      ) => {
        const item = state.items.find(
          (item) => item._id === action.payload.courseId
        );
        if (item) {
          item.owners = action.payload.owners;
          saveCartToLocalStorage(state.items);
        }
      }
    ),
    updateCohortSelection: create.reducer(
      (
        state,
        action: PayloadAction<{ courseId: string; cohortId: string }>
      ) => {
        const item = state.items.find(
          (item) => item._id === action.payload.courseId
        );
        if (item) {
          item.cohort._id = action.payload.cohortId;
          saveCartToLocalStorage(state.items);
        }
      }
    ),
  }),
  selectors: {
    selectCartItems: (cart) => cart.items,
    selectCartTotal: (cart) =>
      cart.items.reduce(
        (total, item) => total + item.price.current * item.quantity,
        0
      ),
    selectCartItemsCount: (cart) =>
      cart.items.reduce((count, item) => count + item.quantity, 0),
  },
});

export const {
  initializeCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  updateOwners,
  updateCohortSelection,
} = cartSlice.actions;
export const { selectCartItems, selectCartTotal, selectCartItemsCount } =
  cartSlice.selectors;
