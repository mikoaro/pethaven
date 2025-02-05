"use client";

import { useState } from "react";
import { PetFilters } from "./pet-filters";
import { PetGrid } from "./pet-grid";
import { Pagination } from "./pagination";
import { pets } from "@/lib/data";
import { CrmPetFilters } from "./crm-pet-filter";

const ITEMS_PER_PAGE = 12;

export function CrmAdoptionSection() {
  const [filteredPets, setFilteredPets] = useState(pets);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (filters: {
    type: string;
    size: string;
    sex: string;
    location: string;
  }) => {
    const filtered = pets.filter((pet) => {
      const typeMatch = filters.type === "All" || pet.type === filters.type;
      const sizeMatch = filters.size === "All" || pet.size === filters.size;
      const sexMatch = filters.sex === "All" || pet.sex === filters.sex;
      const locationMatch =
        filters.location === "All" || pet.location === filters.location;

      return typeMatch && sizeMatch && sexMatch && locationMatch;
    });

    setFilteredPets(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const totalPages = Math.ceil(filteredPets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPets = filteredPets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-8 mt-16">
      <CrmPetFilters onFilterChange={handleFilterChange} />
      {/* <PetGrid pets={paginatedPets} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )} */}
    </div>
  );
}
