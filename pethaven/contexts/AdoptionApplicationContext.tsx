// context/AdoptionApplicationContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NewAdoptionInitialValuesType } from "@/types/adoption-application";
import { Pet } from "@/types/admin/pet";

const defaultAdoptionApplicationData: NewAdoptionInitialValuesType = {
  petPrice: 0,
  salesTax: 0,
  donationAmount: 0,
  total: "",
  subTotal: "",
  petId: "",
  petName: "",
  petType: "",
  petAge: 0,
  petImage: "",
  petSize: "",
  isSigned: false,
  contactName: "",
  contactFirstName: "",
  contactLastName: "",
  status: "",
};

const LOCAL_STORAGE_KEY = "multi-step-new-adoption-application-data";

// Define the type for the context
type AdoptionApplicationContextType = {
  newAdoptionApplicationData: NewAdoptionInitialValuesType;
  dataLoaded: boolean | undefined;
  resetLocalStorage: () => void;
  setDataLoaded: (mode: boolean) => void;
  setNewAdoptionApplicationData: (
    applicationData: NewAdoptionInitialValuesType
  ) => void;
  selectedPet: Pet;
  setSelectedPet: (pet: Pet) => void;
  LOCAL_STORAGE_KEY : string;
};

// export const AdoptionApplicationContext = createContext({});

// Create the context
export const AdoptionApplicationContext = createContext<
  AdoptionApplicationContextType | undefined
>(undefined);

export const AdoptionApplicationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [newAdoptionApplicationData, setNewAdoptionApplicationData] = useState(
    defaultAdoptionApplicationData
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet>();

  console.log(selectedPet);

  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setNewAdoptionApplicationData(defaultAdoptionApplicationData);
  };

  return (
    <AdoptionApplicationContext.Provider
      value={{
        newAdoptionApplicationData,
        defaultAdoptionApplicationData,
        setNewAdoptionApplicationData,
        dataLoaded,
        setDataLoaded,
        selectedPet,
        resetLocalStorage,
        setSelectedPet,
        LOCAL_STORAGE_KEY,
      }}
    >
      {children}
    </AdoptionApplicationContext.Provider>
  );
};

// export const useAdoptionApplication = () => useContext(AdoptionApplicationContext);

// Hook for consuming the context
export const useAdoptionApplication = () => {
  const context = useContext(AdoptionApplicationContext);
  if (!context) {
    throw new Error(
      "useAdoptionApplication must be used within a AdoptionApplicationProvider"
    );
  }
  return context;
};

// let myNumber: number = 10; // Correct

// let inputValue = "10";

// let myNumber: number = parseInt(inputValue); // Convert string "10" to a number
