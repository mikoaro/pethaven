"use client";

import { AdoptionSection } from "@/components/admin/adoption-section";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Pet } from "@/types/admin/pet";
import { API_URL_LOCAL } from "@/utils/constants";
// import { BreadcrumbNav } from "@/components/breadcrumb2";

const PetsPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  // const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const response = await fetch(`${API_URL_LOCAL}/pets`);
    const data = await response.json();
    setPets(data);
  };


  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-6 py-20 mt-10">
        <div className="flex justify-between mb-2">
          <h1 className="text-3xl font-bold">Pets</h1>
          <Button asChild className="flex items-center gap-x-2">
            <Link href="/admin/pets/create">
              <PlusCircle className="w-3.5 h-3.5" />
              Add Pet
            </Link>
          </Button>
        </div>

        {/* <BreadcrumbNav items={[{ label: "Adopt", href: "/adopt" }]} /> */}
        {/* <BreadcrumbNav /> */}
        <AdoptionSection />
      </div>
    </div>
  );
};

export default PetsPage;

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { PetCard } from "@/components/pet-card";
// import { PetList } from "@/components/pet-list";
// import { Button } from "@/components/ui/button";
// import type { Pet } from "@/types/pet";
// import { LayoutGrid, List } from "lucide-react";

// export default function Home() {
//   const [pets, setPets] = useState<Pet[]>([]);
//   const [isGridView, setIsGridView] = useState(true);

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   const fetchPets = async () => {
//     const response = await fetch("/api/pets");
//     const data = await response.json();
//     setPets(data);
//   };

//   const handleDelete = async (id: string) => {
//     const response = await fetch(`/api/pets/${id}`, { method: "DELETE" });
//     if (response.ok) {
//       setPets(pets.filter((pet) => pet.id !== id));
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Pet Shelter</h1>
//         <div className="flex space-x-2">
//           <Button
//             onClick={() => setIsGridView(true)}
//             variant={isGridView ? "default" : "outline"}
//           >
//             <LayoutGrid className="h-4 w-4 mr-2" />
//             Grid
//           </Button>
//           <Button
//             onClick={() => setIsGridView(false)}
//             variant={!isGridView ? "default" : "outline"}
//           >
//             <List className="h-4 w-4 mr-2" />
//             List
//           </Button>
//         </div>
//       </div>
//       <Button asChild className="mb-4">
//         <Link href="/pets/new">Add New Pet</Link>
//       </Button>
//       {isGridView ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {pets.map((pet) => (
//             <PetCard key={pet.id} pet={pet} onDelete={handleDelete} />
//           ))}
//         </div>
//       ) : (
//         <PetList pets={pets} onDelete={handleDelete} />
//       )}
//     </div>
//   );
// }
