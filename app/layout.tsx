"use client";

import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import RootLayoutContent from "./RootLayoutContent";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <RootLayoutContent>
        <NextTopLoader color="#FFB800" zIndex={10000} />
        {children}
        <ToastContainer />
      </RootLayoutContent>
    </StoreProvider>
  );
}
