import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  logo: "colored" | "white";
  textColor: string;
  bgColor: string;
  shadow: string;
  activeColor: string;
}

const initialState: NavbarState = {
  logo: "white",
  textColor: "text-white",
  bgColor: "bg-transparent",
  shadow: "shadow-none",
  activeColor: "text-yellow-100 font-bold",
};

export const navbarSlice = createAppSlice({
  name: "navbar",
  initialState,
  reducers: (create) => ({
    updateNavbarProperties: create.reducer(
      (state, action: PayloadAction<NavbarState>) => {
        state.logo = action.payload.logo;
        state.textColor = action.payload.textColor;
        state.bgColor = action.payload.bgColor;
        state.shadow = action.payload.shadow;
        state.activeColor = action.payload.activeColor;
      }
    ),
  }),
  selectors: {
    selectNavbar: (navbar) => navbar,
  },
});

export const { updateNavbarProperties } = navbarSlice.actions;
export const { selectNavbar } = navbarSlice.selectors;
