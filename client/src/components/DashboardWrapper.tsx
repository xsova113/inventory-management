"use client";

import { cn } from "@/app/lib/utils";
import React, { PropsWithChildren, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StoreProvider, { useAppSelector } from "@/providers/StoreProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const state = useAppSelector((state) => state.global);

  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div
      className={cn(
        "flex min-h-screen w-full bg-gray-50 text-gray-900",
        state.isDarkMode ? "dark" : "light",
      )}
    >
      <Sidebar />
      <main
        className={cn(
          "flex h-full w-full flex-col bg-gray-50 px-9 py-7",
          state.isSidebarCollapsed ? "md:pl-24" : "md:pl-72",
        )}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default function DashboardWrapper({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DashboardLayout>{children}</DashboardLayout>
      </LocalizationProvider>
    </StoreProvider>
  );
}
