import type { Pet } from "@/types/pet";

let pets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    type: "dog",
    breed: "Labrador",
    age: 3,
    description:
      "Friendly and energetic Labrador looking for an active family.",
    behavioralDisclaimer: "Tends to jump on new people when excited.",
    medicalDisclaimer: "Up to date on all vaccinations.",
    needsSponsorship: false,
    // imageUrl: ,
    images: ["/dog 4.jpg"]
  },
  {
    id: "2",
    name: "Whiskers",
    type: "cat",
    breed: "Siamese",
    age: 5,
    description: "Calm and affectionate Siamese cat seeking a quiet home.",
    medicalDisclaimer: "Requires daily medication for arthritis.",
    needsSponsorship: true,
    // imageUrl: "/placeholder.svg?height=200&width=200",
    images: ["/cat 1.jpg"]
  },
];

export function getPets(): Pet[] {
  return pets;
}

export function getPet(id: string): Pet | undefined {
  return pets.find((pet) => pet.id === id);
}

export function addPet(pet: Omit<Pet, "id">): Pet {
  const newPet = { ...pet, id: Date.now().toString() };
  pets.push(newPet);
  return newPet;
}

export function updatePet(id: string, updatedPet: Omit<Pet, "id">): Pet | null {
  const index = pets.findIndex((pet) => pet.id === id);
  if (index !== -1) {
    pets[index] = { ...updatedPet, id };
    return pets[index];
  }
  return null;
}

export function deletePet(id: string): boolean {
  const initialLength = pets.length;
  pets = pets.filter((pet) => pet.id !== id);
  return pets.length < initialLength;
}
