"use client"

import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

interface AdoptedPet {
  id: string
  name: string
  image: string
  href: string
}

const adoptedPets: AdoptedPet[] = [
  {
    id: "1",
    name: "Chibi",
    image: "/images/dogs/borma.jpeg",
    href: "/adopt/chibi",
  },
  {
    id: "2",
    name: "Max",
    image: "/dog 3.jpeg",
    href: "/adopt/max",
  },
  {
    id: "3",
    name: "Shadow",
    image: "/dog 4.jpg",
    href: "/adopt/shadow",
  },
  {
    id: "4",
    name: "Luna",
    image: "/dog 2.jpeg",
    href: "/adopt/luna",
  },
  {
    id: "5",
    name: "Bruno",
    image: "/cat 1.jpg",
    href: "/adopt/bruno",
  },
  {
    id: "6",
    name: "Radish",
    image: "/cat 4.jpg",
    href: "/adopt/radish",
  },
  {
    id: "7",
    name: "Rocky",
    image: "/dog 2.jpeg",
    href: "/adopt/rocky",
  },
  {
    id: "8",
    name: "Tiger",
    image: "/cat 4.jpg",
    href: "/adopt/tiger",
  },
  {
    id: "9",
    name: "Hachi",
    image: "/dog 2.jpeg",
    href: "/adopt/hachi",
  },
  {
    id: "10",
    name: "Snow",
    image: "/cat 1.jpg               ",
    href: "/adopt/snow",
  },
]

export function AdoptedPets() {
  return (
    <section className="mt-16 text-center">
      <h2 className="text-4xl font-bold mb-8">Animals that found forever homes!</h2>
      <div className="relative px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {adoptedPets.map((pet) => (
              <CarouselItem key={pet.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-[20%]">
                <div className="relative group">
                  <div className="aspect-square relative overflow-hidden rounded-full">
                    <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                  </div>
                  {pet.name === "Radish" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={pet.href}
                        className="bg-black/75 text-white px-4 py-2 rounded-full text-sm hover:bg-black/90 transition-colors"
                      >
                        See details
                      </Link>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
      <Button className="mt-8 bg-black text-white hover:bg-gray-900 rounded-full px-8">See more</Button>
    </section>
  )
}

