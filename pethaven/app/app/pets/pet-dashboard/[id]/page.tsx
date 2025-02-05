"use client";

import { PetHero } from "@/components/pet-hero";
import { PetDetails } from "@/components/pet-details";
import { Breadcrumb } from "@/components/breadcrumb";
// import { pet } from "@/lib/data";
import { AdoptedPets } from "@/components/adopted-pets";
import { use, useEffect, useState } from "react";
import { Pet } from "@/types/admin/pet";
import { API_URL_LOCAL } from "@/utils/constants";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";
import { CartDetails } from "@/types/adoption-process";
import { NewAdoptionInitialValuesType } from "@/types/adoption-application";

const cartDetails: CartDetails = {
  subtotal: 200.0,
  tax: 8.25,
  total: 204.42,
};

export default function PetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [pet, setPet] = useState<Pet>();

  const { setSelectedPet, setDataLoaded, resetLocalStorage } =
    useAdoptionApplication();

  useEffect(() => {
    resetLocalStorage();
    setDataLoaded(false);
    getPet();
  }, [id]);

  const getPet = async () => {
    const response = await fetch(`${API_URL_LOCAL}/pets/${id}`);
    const data = await response.json();
    // console.log(data);
    setPet(data);
    setSelectedPet(data);
  };

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#fdf6e7]">
      <div className="container mx-auto px-6 py-20 mt-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Adopt", href: "/app/pets/pets-list" },
            { label: pet.name, href: "/adopt/pompia" },
          ]}
        />
        <div className="mt-6">
          <PetHero pet={pet} />
          <PetDetails pet={pet} />
          <AdoptedPets />
        </div>
      </div>
    </div>
  );
}
