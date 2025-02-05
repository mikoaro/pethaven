"use client"

import { AdoptionHero } from "@/components/adoption-hero";
import { AdoptionSection } from "@/components/adoption-section";
import { BreadcrumbNav } from "@/components/breadcrumb2";
import { SuccessStories } from "@/components/success-stories";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";
import { useEffect } from "react";

const PetsPage = () => {
  // const { resetLocalStorage } = useAdoptionApplication();

  // useEffect(() => {
  //   resetLocalStorage();
  // });

  return (
    <div className="w-full min-h-screen bg-[#fdf6e7]">
      <div className="container mx-auto px-6 py-20 mt-10">
        {/* <BreadcrumbNav items={[{ label: "Adopt", href: "/adopt" }]} /> */}
        <BreadcrumbNav />
        <AdoptionHero />
        <AdoptionSection />
        <SuccessStories />
      </div>
    </div>
  );
};

export default PetsPage;
