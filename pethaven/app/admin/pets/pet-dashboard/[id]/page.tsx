"use client";

import { PetHero } from "@/components/admin/pet-hero";
import { PetDetails } from "@/components/admin/pet-details";
import { Breadcrumb } from "@/components/breadcrumb";
// import { pet } from "@/lib/data";
import { AdoptedPets } from "@/components/adopted-pets";
import { use, useEffect, useState } from "react";
import { API_URL_LOCAL } from "@/utils/constants";
import { Pet } from "@/types/admin/pet";

// export default function PetPage() {
export default function PetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [pet, setPet] = useState<Pet>();

  useEffect(() => {
    getPet();
  }, [id]);

  const getPet = async () => {
    const response = await fetch(`${API_URL_LOCAL}/pets/${id}`);
    const data = await response.json();
    console.log(data);
    setPet(data);
  };

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-6 py-20 mt-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Adopt", href: "/admin/pets" },
            { label: pet.name, href: `/adopt/${pet.name}` },
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
