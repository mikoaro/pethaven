"use client";

import { useState } from "react";
import Image from "next/image";
import type { Pet } from "@/types/admin/pet";
// import type { Pet } from "@/types/pet";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PetHeroProps {
  pet: Pet;
}

export function PetHero({ pet }: PetHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pet.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + pet.images.length) % pet.images.length
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-col md:flex-row items-center">
      {/* Left Column - Pet Info */}
      <Card className="h-1/2 flex-1  w-full md:w-[380px] p-6 space-y-6 bg-white rounded-3xl rounded-r-none border-none shadow-one">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-[#ffd233] px-4 py-1.5 text-sm font-medium">
            {pet.status}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#ffd233] px-4 py-1.5 text-sm font-medium">
            {pet.type}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#ffd233] px-4 py-1.5 text-sm font-medium">
            {pet.location?.city}
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-[2.75rem] font-bold text-gray-900 leading-none">
            {pet.name}
          </h1>

          <div className="space-y-1 text-gray-600 text-lg">
            <p>{pet.age} years</p>
            <p>{pet.sex}</p>
            <p>{pet.breed}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2  ">
          {pet.images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2",
                currentImageIndex === index
                  ? "border-[#ffd233]"
                  : "border-transparent"
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${pet.name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </Card>

      {/* Right Column - Main Image */}
      <Card className="h-full flex-1 mt-6 md:mt-0 md:ml-0 bg-white rounded-3xl border-none">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={pet.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${pet.name} main image`}
            fill
            className="object-contain rounded-3xl"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              onClick={previousImage}
              className="rounded-full bg-[#ffd233] w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#e6bd2e] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </button>
            <button
              onClick={nextImage}
              className="rounded-full bg-[#ffd233] w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#e6bd2e] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
