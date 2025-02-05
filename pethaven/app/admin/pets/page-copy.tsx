"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PetCard } from "@/components/pet-card";
import { PetList } from "@/components/pet-list";
import { Button } from "@/components/ui/button";
import type { Pet } from "@/types/pet";
import { LayoutGrid, List } from "lucide-react";
import { CrmPetFilters } from "@/components/crm-pet-filter";

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const response = await fetch("/api/pets");
    const data = await response.json();
    setPets(data);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/pets/${id}`, { method: "DELETE" });
    if (response.ok) {
      setPets(pets.filter((pet) => pet.id !== id));
    }
  };

  return (
    <div className="px-16 py-10">
       <h1 className="text-3xl font-bold">Pets</h1>
      <div className="flex justify-between items-center mb-4 mt-5">
       
        <div>
      <CrmPetFilters onFilterChange={function (): void {
            throw new Error("Function not implemented.");
          } } />
      </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsGridView(true)}
            variant={isGridView ? "default" : "outline"}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setIsGridView(false)}
            variant={!isGridView ? "default" : "outline"}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button asChild className="mb-4">
          <Link href="/admin/pets/create">Add New Pet</Link>
        </Button>
        </div>
      </div>
     
      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <PetList pets={pets} onDelete={handleDelete} />
      )}
    </div>
  );
}
