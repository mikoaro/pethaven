// export interface Pet {
//   id: string;
//   name: string;
//   status: string;
//   type: string;
//   location: string;
//   birthDate: string;
//   gender: string;
//   breed: string;
//   images: string[];
//   thumbnails: string[];
//   arkNo: string;
//   arrivedAt: string;
//   weight: string;
//   background: string;
//   description: string;
//   age?: number;
//   behavioralDisclaimer?: string;
//   medicalDisclaimer?: string;
//   needsSponsorship: boolean;
// }

export interface Pet {
  needsSponsorship: any;
  id: string;
  name: string;
  status: string;
  type: string;
  location: string;
  birthDate: string;
  gender: string;
  breed: string;
  images: string[];
  thumbnails: string[];
  arkNo: string;
  arrivedAt: string;
  weight: string;
  background: string;
  description: string;
}

export type PetType =
  | "dog"
  | "cat"
  | "fish"
  | "rabbit"
  | "hamster"
  | "guinea pig"
  | "turtle"
  | "lizard"
  | "bird"
  | "other";


  