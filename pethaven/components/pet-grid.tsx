"use client";

import Image from "next/image";
// import type { Pet2 } from "@/lib/data";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL_LOCAL } from "@/utils/constants";
import { Pet } from "@/types/admin/pet";

interface PetGridProps {
  pets: Pet[];
}

export function PetGrid({ pets }: PetGridProps) {
  const [pets2, setPets2] = useState<Pet[]>([]);

  useEffect(() => {
    getPets();
  }, []);

  const getPets = async () => {
    const response = await fetch(`${API_URL_LOCAL}/pets`);
    const data = await response.json();
    console.log(data);
    setPets2(data);
  };

  const shortenDescription = (description: string) => {
    if (description.length <= 50) {
      return description;
    } else {
      return description.substring(0, 50) + "...";
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className="relative pb-12 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="aspect-square relative">
            <Image
              src={pet.images[0] || "/placeholder.svg"}
              alt={pet.name}
              fill
              className="object-cover"
            />
          </div>
          <div className=" p-4">
            <h3 className="font-semibold text-lg">{pet.name}</h3>
            <p className="text-sm text-gray-600">{shortenDescription(pet.description)}</p>
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
            {/* <Link href="/app/pets/pet-dashboard">
              <Button className="absolute bottom-2 left-2 bg-[#F5BA41] mt-5  hover:bg-red-400">
                Adopt Me
              </Button>
            </Link> */}

            <Button
              asChild
              className="absolute bottom-2 left-2 bg-[#F5BA41] mt-5  hover:bg-red-400"
            >
              <Link href={`/app/pets/pet-dashboard/${pet.id}`}>Adopt Me</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
