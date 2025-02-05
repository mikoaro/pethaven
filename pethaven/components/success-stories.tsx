"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { adoptedPets } from "@/lib/adopted-pets"

export function SuccessStories() {
  return (
    <section className="py-16 bg-[#FFF8E7]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-medium text-center mb-12">Animals that found forever homes!</h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {adoptedPets.map((pet) => (
                <CarouselItem key={pet.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white">
                      <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                      {pet.details && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                          <span className="text-lg font-medium">{pet.name}</span>
                          <span className="text-sm">{pet.details}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="default" className="bg-black text-white rounded-full px-8 hover:bg-black/90">
            See more
          </Button>
        </div>
      </div>
    </section>
  )
}

