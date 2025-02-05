import Image from "next/image";
import type { Pet } from "@/types/admin/pet";
// import type { Pet2 } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAdminPetsViewMode } from "@/contexts/AdminPetsViewModeContext";
import { PetList } from "../pet-list";
import { useEffect, useState } from "react";
// import type { Pet } from "@/types/pet";
import { API_URL_LOCAL } from "@/utils/constants";

interface PetGridProps {
  pets: Pet[];
}

export function PetGrid({ pets }: PetGridProps) {
  console.log(pets);
  const { isGridView } = useAdminPetsViewMode();
  const [pets2, setPets2] = useState<Pet[]>([]);
  // const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    getPets();
  }, []);

  // useEffect(() => {
  //   fetchPets();
  // }, []);

  const getPets = async () => {
    const response = await fetch(`${API_URL_LOCAL}/pets`);
    const data = await response.json();
    console.log(data);
    setPets2(data);
  };

  // const fetchPets = async () => {
  //   const response = await fetch("/api/pets");
  //   const data = await response.json();
  //   setPets2(data);
  // };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/pets/${id}`, { method: "DELETE" });
    if (response.ok) {
      setPets2(pets2.filter((pet) => pet.id !== id));
    }
  };

  const shortenDescription = (description: string) => {
    if (description.length <= 50) {
      return description;
    } else {
      return description.substring(0, 50) + "...";
    }
  };

  return (
    <div>
      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="relative pb-12 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <Image
                  src={pet.images[0]}
                  alt={pet.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className=" p-4">
                <h3 className="font-semibold text-lg">{pet.name}</h3>
                <p className="text-sm text-gray-600">
                  {shortenDescription(pet.description)}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {pet.type}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {pet.sex}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {pet.size}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {pet.location?.city}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    asChild
                    variant="outline"
                    className="absolute bottom-2 left-2 mt-5  hover:bg-[#F5BA41]"
                  >
                    <Link href={`/admin/pets/pet-dashboard/${pet.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="destructive"
                    className="absolute bottom-2 right-2  hover:bg-red-400"
                  >
                    <Link href="/admin/pets/delete">Delete</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <PetList pets={pets2} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
