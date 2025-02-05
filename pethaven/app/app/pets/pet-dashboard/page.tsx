import { PetHero } from "@/components/pet-hero";
import { PetDetails } from "@/components/pet-details";
import { Breadcrumb } from "@/components/breadcrumb";
import { pet } from "@/lib/data";
import { AdoptedPets } from "@/components/adopted-pets";

export default function PetPage() {
  return (
    <div className="w-full min-h-screen bg-[#fdf6e7]">
      <div className="container mx-auto px-6 py-20 mt-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Adopt", href: "/app/pets/pets-list" },
            { label: "Pompia", href: "/adopt/pompia" },
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
