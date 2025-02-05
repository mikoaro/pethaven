"use client";

import { useState } from "react";
import Image from "next/image";
import type { Pet } from "@/types/pet";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="md:grid md:grid-cols-[400px_1fr] lg:grid-cols-[450px_1fr] gap-8 items-start">
      {/* Left Column - Pet Info */}
      <div className="space-y-6 p-6 bg-white rounded-3xl">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-[#ffd233] px-4 py-1.5 text-sm">
            {pet.status}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#ffd233] px-4 py-1.5 text-sm">
            {pet.type}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#ffd233] px-4 py-1.5 text-sm">
            {pet.location}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-[2.5rem] font-bold text-gray-900 leading-tight">
            {pet.name}
          </h1>

          <div className="space-y-0.5 text-gray-600">
            <p>{pet.birthDate}</p>
            <p>{pet.gender}</p>
            <p>{pet.breed}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {pet.thumbnails.map((image, index) => (
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
      </div>

      {/* Right Column - Main Image */}
      <div className="relative mt-6 md:mt-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white">
          <Image
            src={pet.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${pet.name} main image`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            onClick={previousImage}
            className="rounded-full bg-white w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="rounded-full bg-white w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
