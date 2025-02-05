"use client";

import React from "react";
import { GuardianshipTable } from "@/components/guardianship-table";

export default function DonorsPage() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50 py-10 px-10">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Adoptions and Sponsorships
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <GuardianshipTable />
        </div>
      </div>
    </div>
  );
}
