"use client";

import React, { useEffect } from "react";
import Navbar from "../(components)/Navbar";
import Sidebar from "../(components)/Sidebar";
import StoreProvider, { useAppSelector, RootState } from "./redux";
import AuthProvider from "./authProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state: RootState) => state?.global?.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector(
    (state: RootState) => state?.global?.isDarkMode
  );

  useEffect(() => {
    // Sync dark mode class with state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-dark-bg dark:text-white">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg dark:text-white ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
     <AuthProvider>
        <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
    </StoreProvider>
  );
};

export default DashboardWrapper;