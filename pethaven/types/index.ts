export interface Activity {
  id: string;
  date: string;
  description: string;
  type: "visit" | "lab" | "admission";
}

export interface Update {
  id: string;
  date: string;
  sender: string;
  recipient: string;
  animalId: string;
  message: string;
}

export interface Donation {
  id: string;
  date: string;
  donor: string;
  amount: number;
  animalId: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateAdded: string;
}

export interface AnimalAdoption {
  id: string;
  animalId: string;
  animalName: string;
  adopter: string;
  date: string;
  status: "Adopted" | "Sponsored" | "Fostered";
}

