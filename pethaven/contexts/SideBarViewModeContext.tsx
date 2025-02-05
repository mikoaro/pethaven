// context/SideBarViewModeContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context
type SideBarViewModeContextType = {
  sideBarViewMode: boolean;
  //   setSideBarViewMode: (mode: string) => void;
  toggleSideBarViewMode: () => void;
};

// Create the context
export const SideBarViewModeContext = createContext<
  SideBarViewModeContextType | undefined
>(undefined);

export const SideBarViewModeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sideBarViewMode, setSideBarViewMode] = useState(false);

  const toggleSideBarViewMode = () => {
    setSideBarViewMode(sideBarViewMode === true ? false : true);
  };

  return (
    <SideBarViewModeContext.Provider
      value={{ sideBarViewMode, toggleSideBarViewMode }}
    >
      {children}
    </SideBarViewModeContext.Provider>
  );
};

// export const useSideBarViewMode = () => useContext(SideBarViewModeContext);

// Hook for consuming the context
export const useSideBarViewMode = () => {
  const context = useContext(SideBarViewModeContext);
  if (!context) {
    throw new Error(
      "useSideBarViewMode must be used within a SideBarViewModeProvider"
    );
  }
  return context;
};
