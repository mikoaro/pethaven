import type { Pet } from "@/types/pet";

export let petsData: Pet[] = [
  {
    pet_id: "P-12345",
    name: "Buddy",
    type: "Dog",
    breed: "Labrador Retriever Mix",
    age: "3 years",
    sex: "Male",
    color: "Golden",
    size: "20kg~",
    spayed_neutered: true,
    microchip_id: "987654321012345",
    description:
      "Buddy is a friendly and energetic Labrador Retriever mix who loves to play fetch and go for long walks. He's great with children and other dogs, making him an ideal family pet.",
    location: {
      shelter_name: "Happy Tails Animal Shelter",
      address: "123 Main Street",
      city: "Los Angeles",
      state: "CA",
      zip_code: "90001",
      phone: "+1-555-123-4567",
      email: "contact@happytails.org",
    },
    medical_disclaimer: {
      statement:
        "Buddy has received all necessary vaccinations, including rabies, distemper, and parvovirus. He is on flea and tick prevention and has been dewormed. He has a history of mild seasonal allergies, which may require occasional antihistamine treatment.",
      current_medications: [
        {
          name: "Antihistamine",
          dosage: "5 mg as needed",
        },
      ],
      veterinary_recommendations:
        "Buddy should have annual wellness exams and ongoing monitoring for any changes in his allergy symptoms.",
    },
    behavioral_disclaimer: {
      statement:
        "Buddy is a friendly and playful dog but may exhibit anxiety in new environments. He tends to be cautious around strangers and may require slow introductions. He has shown a tendency to chew objects when left alone for extended periods.",
      known_behavioral_traits: [
        {
          trait: "Playful",
          description: "Enjoys games like fetch and tug-of-war.",
        },
        {
          trait: "Cautious",
          description: "May bark or retreat when meeting new people.",
        },
        {
          trait: "Chewing",
          description:
            "Needs appropriate chew toys to avoid destructive behavior.",
        },
      ],
      training_recommendations: [
        {
          recommendation: "Positive Reinforcement",
          description:
            "Reward-based training to build confidence and reduce anxiety.",
        },
        {
          recommendation: "Crate Training",
          description:
            "To manage chewing and provide a safe space when left alone.",
        },
      ],
    },
    adoption_details: {
      adoption_fee: 150,
      required_documents: [
        "Adoption Agreement",
        "Behavioral Disclaimer",
        "Medical Disclaimer",
      ],
    },
    status: "Available for Adoption",
    needs_sponsorship: false,
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
  {
    pet_id: "P-67890",
    name: "Whiskers",
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "2 years",
    sex: "Female",
    color: "Black and White",
    size: "~10kg",
    spayed_neutered: true,
    microchip_id: "123456789012345",
    description:
      "Whiskers is a calm and affectionate cat who enjoys lounging in sunny spots and playing with feather toys. She's an ideal companion for a quiet household.",
    location: {
      shelter_name: "Happy Tails Animal Shelter",
      address: "123 Main Street",
      city: "Los Angeles",
      state: "CA",
      zip_code: "90001",
      phone: "+1-555-123-4567",
      email: "contact@happytails.org",
    },
    medical_disclaimer: {
      statement:
        "Whiskers has received all necessary vaccinations, including rabies and FVRCP. She is on flea prevention and has been dewormed. She has no known medical issues.",
      current_medications: [],
      veterinary_recommendations:
        "Whiskers should have annual wellness exams and dental cleanings as recommended by the veterinarian.",
    },
    behavioral_disclaimer: {
      statement:
        "Whiskers is a friendly and independent cat. She enjoys playing with toys and lounging in sunny spots. She may be shy around new people at first but warms up quickly.",
      known_behavioral_traits: [
        {
          trait: "Independent",
          description: "Enjoys alone time and may not be overly clingy.",
        },
        {
          trait: "Playful",
          description: "Likes interactive toys and laser pointers.",
        },
      ],
      training_recommendations: [
        {
          recommendation: "Positive Reinforcement",
          description: "Use treats and praise to encourage desired behaviors.",
        },
        {
          recommendation: "Environmental Enrichment",
          description:
            "Provide scratching posts, climbing trees, and interactive toys.",
        },
      ],
    },
    adoption_details: {
      adoption_fee: 100,
      required_documents: [
        "Adoption Agreement",
        "Behavioral Disclaimer",
        "Medical Disclaimer",
      ],
    },
    status: "Available for Adoption",
    needs_sponsorship: true,
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
];

export function getPets(): Pet[] {
  return petsData;
}

export function getPet(id: string): Pet | undefined {
  return petsData.find((pet) => pet.pet_id === id);
}

export function addPet(pet: Omit<Pet, "pet_id">): Pet {
    console.log("yyyy")
    console.log(pet)

  const newPet = { ...pet, pet_id: `P-${Date.now().toString()}` };
  petsData.push(newPet);
  return newPet;
}

export function updatePet(
  id: string,
  updatedPet: Omit<Pet, "pet_id">
): Pet | null {
  const index = petsData.findIndex((pet) => pet.pet_id === id);
  if (index !== -1) {
    petsData[index] = { ...updatedPet, pet_id: id };
    return petsData[index];
  }
  return null;
}

export function deletePet(id: string): boolean {
  const initialLength = petsData.length;
  petsData = petsData.filter((pet) => pet.pet_id !== id);
  return petsData.length < initialLength;
}
