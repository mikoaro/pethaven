import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Pet } from "@/types/admin/pet"
// import type { Pet } from "@/types/pet"

interface PetDetailsProps {
  pet: Pet
}

export function PetDetails({ pet }: PetDetailsProps) {
  return (
    <Card className="mt-8 p-8 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold mb-6">Details</h2>
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div className="text-gray-600">PH No.</div>
            <div>PH-{pet.id}</div>
            {/* <div className="text-gray-600">Arrived at PH</div>
            <div>{pet.arrivedAt}</div> */}
            <div className="text-gray-600">Location</div>
            <div>{pet.location?.address}</div>
            <div className="text-gray-600">Sex</div>
            <div>{pet.sex}</div>
            <div className="text-gray-600">Age</div>
            <div>{pet.age} years</div>
            <div className="text-gray-600">Weight</div>
            <div>{pet.size}</div>
            <div className="text-gray-600">Breed</div>
            <div>{pet.breed}</div>
            {/* <div className="text-gray-600">Background</div>
            <div>{pet.background}</div> */}
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">{pet.description}</p>
          {/* <Button className="w-full bg-black text-white hover:bg-gray-900 rounded-full py-6 text-base">
            Adoption Application
          </Button> */}
        </div>
      </div>
    </Card>
  )
}

