import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "@/app/features/cart/slice/cartSlice";
import { navbarSlice } from "@/app/features/navbar/navbarSlice";
import { courseSlice } from "@/app/features/courses/slice/courseSlice";
import { authSlice } from "@/app/features/admin/slice/authSlice";
import { courseManagementSlice } from "@/app/features/admin/slice/courseManagementSlice";
import { orderSlice } from "@/app/features/admin/slice/orderSlice";
import { cohortMembersSlice } from "@/app/features/admin/slice/cohortMembersSlice";
import { cohortSlice } from "@/app/features/cohorts/slice/cohortSlice";
import allCohortSlice from "@/app/features/admin/slice/allCohortSlice";
import { cohortManagementSlice } from "@/app/features/admin/slice/cohortManagementSlice";
import { referralSlice } from "@/app/features/admin/slice/referralSlice";
import { userReferralSlice } from "@/app/features/referral/slice/userReferralSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  cartSlice,
  navbarSlice,
  courseSlice,
  authSlice,
  courseManagementSlice,
  orderSlice,
  cohortMembersSlice,
  cohortSlice,
  allCohortSlice,
  cohortManagementSlice,
  referralSlice,
  userReferralSlice
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat();
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
