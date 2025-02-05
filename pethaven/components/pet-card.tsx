import Link from "next/link";
import type { Pet } from "@/types/pet";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface PetCardProps {
  pet: Pet;
  onDelete: (id: string) => void;
}

export function PetCard({ pet, onDelete }: PetCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent>
        {pet.images && pet.images.length > 0 ? (
          <Carousel className="">
            <CarouselContent className="flex">
              {pet.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${pet.name} - Image ${index + 1}`}
                    className="object-cover"
                    height={600}
                    width={800}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-7" />
            <CarouselNext className="mr-7" />
          </Carousel>
        ) : (
          <Image
            src="/placeholder.svg"
            alt={pet.name}
            className="object-cover"
            height={600}
            width={800}
          />
        )}
        <div className="text-xl font-semibold mt-5">
        {pet.name}
        </div>
        <div>
        <span className="text-xs py-1 rounded-full">{pet.description}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{pet.type}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{pet.breed}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{pet.age} years</span>
              <div>
              {pet.needsSponsorship && (
                  <Badge variant="secondary" className="">
                    Needs Sponsorship
                  </Badge>
              )}
              </div>
        </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/pets/${pet.id}`}>View Details</Link>
        </Button>
        <Button variant="destructive" onClick={() => onDelete(pet.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
