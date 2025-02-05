export interface Pet {
    id: string
    name: string
    type: "Dog" | "Cat" | "Others"
    breed?: string
    age: string
    sex: "Male" | "Female"
    color: string
    size: "~10kg" | "10-20kg" | "20kg~"
    spayed_neutered: boolean
    microchip_id: string
    description: string
    location?: {
      shelter_name: string
      address: string
      city: string
      state: string
      zip_code: string
      phone: string
      email: string
    }
    medical_disclaimer: {
      statement: string
      current_medications: {
        name: string
        dosage: string
      }[]
      veterinary_recommendations: string
    }
    behavioral_disclaimer: {
      statement: string
      known_behavioral_traits: {
        trait: string
        description: string
      }[]
      training_recommendations: {
        recommendation: string
        description: string
      }[]
    }
    adoption_details: {
      adoption_fee: number
      required_documents: string[]
    }
    status: string
    needs_sponsorship: boolean
    images: string[]
  }
  
  