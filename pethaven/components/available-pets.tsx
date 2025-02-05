"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { PawPrint } from "lucide-react"
import Link from "next/link"

const pets = [
  {
    id: 1,
    image: "/dog 1.jpeg",
    name: "Pet 1",
  },
  {
    id: 2,
    image: "/dog 2.jpeg",
    name: "Pet 2",
  },
  {
    id: 3,
    image: "/dog 3.jpeg",
    name: "Pet 3",
  },
  {
    id: 4,
    image: "/dog 4.jpg",
    name: "Pet 4",
  },
  {
    id: 5,
    image: "/dog 5.jpeg",
    name: "Pet 5",
  },
  {
    id: 6,
    image: "/dog 6.jpg",
    name: "Pet 6",
  },
  {
    id: 7,
    image: "/dog 7.jpeg",
    name: "Pet 7",
  },
  {
    id: 8,
    image: "/dog 8.jpeg",
    name: "Pet 8",
  },
  {
    id: 9,
    image: "/dog 9.jpeg",
    name: "Pet 9",
  },
  {
    id: 10,
    image: "/dog 10.jpg",
    name: "Pet 10",
  },
]

export function AvailablePets() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-start mb-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Available for Adoption</h2>
            <p className="text-gray-600 mb-6">
              If you're thinking of adopting your next pet, please see our Adoption Procedure information and complete
              the application form.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="rounded-full bg-white border-[#F5BA41] text-black hover:bg-[#F5BA41]/10"
              >
                Find dogs to adopt
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-white border-[#F5BA41] text-black hover:bg-[#F5BA41]/10"
              >
                Find cats to adopt
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-white border-[#F5BA41] text-black hover:bg-[#F5BA41]/10"
              >
                Find other animals to adopt
              </Button>
            </div>
          </div>
          <Link href='/app/pets/pets-list'>
          <Button variant="outline" className="rounded-full border-white bg-black text-white hover:bg-black hover:text-white hover:outline h-16 w-16 p-14 text-sm font-bold">
            View more
            <PawPrint className="h-10 w-10 font-bold" />
          </Button>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {pets.map((pet) => (
              <CarouselItem key={pet.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-[20%]">
                <div className="aspect-square relative overflow-hidden rounded-full">
                  <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </Carousel>
      </div>
    </section>
  )
}

