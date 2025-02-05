'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { DonationsTable } from '@/components/donations-table';

export default function DonationsPage() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50 py-10 px-10">
      <div className="flex flex-col w-full">
        <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Donations List</h1>
        <Button>
          + Add Donations
        </Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
        <DonationsTable />
        </div>
      </div>
    </div>
  );
}
