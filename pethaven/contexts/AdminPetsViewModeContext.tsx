// context/AdminPetsViewModeContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context
type AdminPetsViewModeContextType = {
  isGridView: boolean;
  setIsGridView: (mode: boolean) => void;
};

// Create the context
export const AdminPetsViewModeContext = createContext<
  AdminPetsViewModeContextType | undefined
>(undefined);

export const AdminPetsViewModeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <AdminPetsViewModeContext.Provider value={{ isGridView, setIsGridView }}>
      {children}
    </AdminPetsViewModeContext.Provider>
  );
};

// export const useAdminPetsViewMode = () => useContext(AdminPetsViewModeContext);

// Hook for consuming the context
export const useAdminPetsViewMode = () => {
  const context = useContext(AdminPetsViewModeContext);
  if (!context) {
    throw new Error(
      "useAdminPetsViewMode must be used within a AdminPetsViewModeProvider"
    );
  }
  return context;
};
