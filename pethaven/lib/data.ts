import type { Pet } from "@/types/pet";

export const pet: Pet = {
  id: "pompia",
  name: "Pompia",
  status: "Looking for parents",
  type: "Dog",
  location: "Los Angeles",
  birthDate: "Born in January 2021",
  gender: "Female",
  breed: "Crossbreed",
  images: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
  ],
  thumbnails: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d7VXBIcfoUNyPDjikvTG2IxV82lxdp.png",
  ],
  arkNo: "D53-111",
  arrivedAt: "January 2025",
  weight: "20.5kg",
  background: "Pompia's owner got ill and was unable to care for her.",
  description:
    "Pompia is an incredibly sweet, gentle and easy-going girl who found herself at PetHaven after her owner got ill. Because of her introverted character, we weren't too sure whether she liked people, but we were mistaken! Pompia, is actually very fond of people, and she is very sweet when you enter her kennel. Unlike a lot of dogs who come bouncing over to greet you, she gently walks over with a happy wag of the tail and smiley eyes and it's just adorable. Her biggest joy in life is walking. She has even stubbornly looked at us towards the end of a walk, as if to say \"really, you're done?\". So, if you're an avid walker, Pompia may be just the girl for you! She is also very patient and calm when being shampooed or groomed. She is a bit of a gourmet and has her picky moments with food, but in general enjoys eating and has a good appetite. Please come take Pompia for a walk at PetHaven soon!",
};

export type Pet2 = {
  id: string;
  name: string;
  type: "Dog" | "Cat" | "Other";
  image: string;
  sex: "Male" | "Female";
  size: "~10kg" | "10-20kg" | "20kg~";
  location: "Los Angeles" | "Asheville" | "Houston";
  description: string;
};

export const pets: Pet2[] = [
  {
    id: "1",
    name: "Luna",
    type: "Cat",
    image: "/cat 1.jpg",
    sex: "Female",
    size: "~10kg",
    location: "Los Angeles",
    description: "A friendly black and white cat who loves attention",
  },
  {
    id: "2",
    name: "Tiger",
    type: "Dog",
    image: "/dog 4.jpg",
    sex: "Male",
    size: "~10kg",
    location: "Asheville",
    description: "A gentle tabby cat who enjoys peaceful environments",
  },
  {
    id: "3",
    name: "Snowball",
    type: "Other",
    image: "/other.jpg",
    sex: "Female",
    size: "~10kg",
    location: "Houston",
    description: "A pure white cat with striking blue eyes",
  },
  // Adding more pets to demonstrate pagination
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 4}`,
    name: `Pet ${i + 4}`,
    type: (i % 3 === 0 ? "Dog" : i % 3 === 1 ? "Cat" : "Other") as
      | "Dog"
      | "Cat"
      | "Other",
    image: "/placeholder.svg?height=300&width=300",
    sex: (i % 2 === 0 ? "Male" : "Female") as "Male" | "Female",
    size: i % 3 === 0 ? "~10kg" : i % 3 === 1 ? "10-20kg" : "20kg~",
    location: i % 2 === 0 ? "Osaka" : "Tokyo",
    description: `A lovely pet looking for a forever home ${i + 4}`,
  })),
];
