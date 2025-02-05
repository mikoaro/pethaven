'use client';

import React from 'react';
import { AdoptersTable } from '@/components/adopters-table';

export default function AdoptersPage() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50 py-10 px-4">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Adopters List</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <AdoptersTable />
        </div>
      </div>
    </div>
  );
}
