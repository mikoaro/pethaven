import { PetForm } from "@/components/pet-form"

export default function NewPet() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Pet</h1>
      <PetForm />
    </div>
  )
}

