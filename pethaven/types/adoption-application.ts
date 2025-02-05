export interface Pet {
  id: string;
  name: string;
  type: "Dog" | "Cat" | "Others";
  breed?: string;
  age: string;
  price: number;
  sex: "Male" | "Female";
  color: string;
  size: "~10kg" | "10-20kg" | "20kg~";
  spayed_neutered: boolean;
  microchip_id: string;
  description: string;
  location?: {
    shelter_name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    phone: string;
    email: string;
  };
  medical_disclaimer: {
    statement: string;
    current_medications: {
      name: string;
      dosage: string;
    }[];
    veterinary_recommendations: string;
  };
  behavioral_disclaimer: {
    statement: string;
    known_behavioral_traits: {
      trait: string;
      description: string;
    }[];
    training_recommendations: {
      recommendation: string;
      description: string;
    }[];
  };
  adoption_details: {
    adoption_fee: number;
    required_documents: string[];
  };
  status: string;
  needs_sponsorship: boolean;
  images: string[];
}

export type CartDetails = {
  subtotal: number;
  tax: number;
  total: number;
};

export type DisclaimerType = {
  id: string;
  title: string;
  description?: string;
};

export type Step = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type AdoptionFormData = {
  cart: CartDetails;
  agreedToDisclaimers: boolean;
  agreedToContract: boolean;
  applicationSubmitted: boolean;
};

export type NewAdoptionInitialValuesType = {
  [x: string]: import("/Users/mikoaro/Documents/Projects/Strategic-Skills/next-ai-finance-green/0-a-PetHaven/gitlab/pethaven/types/admin/pet").Pet;
  petPrice: number;
  salesTax: number;
  donationAmount: number;
  total: string;
  subTotal: string;
  petId: string;
  petName: string;
  petType: string;
  petAge?: number | undefined;
  petImage: string;
  petSize: string;
  isSigned: boolean;
  contactName: string;
  contactFirstName: string;
  contactLastName: string;
  status: string;
}
