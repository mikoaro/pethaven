export type AdoptedPet = {
  id: string;
  name: string;
  image: string;
  type: "Dog" | "Cat";
  details?: string;
};

export const adoptedPets: AdoptedPet[] = [
  {
    id: "1",
    name: "Max",
    type: "Dog",
    image: "/dog 1.jpeg",
  },
  {
    id: "2",
    name: "Luna",
    type: "Dog",
    image: "/dog 2.jpeg",
  },
  {
    id: "3",
    name: "Shadow",
    type: "Cat",
    image: "/cat 1.jpg",
  },
  {
    id: "4",
    name: "Tiger",
    type: "Cat",
    image: "/cat 2.jpeg",
  },
  {
    id: "5",
    name: "Bruno",
    type: "Dog",
    image: "/dog 3.jpeg",
  },
  {
    id: "6",
    name: "Radish",
    type: "Dog",
    image: "/dog 4.jpg",
    details: "See details",
  },
  {
    id: "7",
    name: "Rocky",
    type: "Dog",
    image: "/dog 5.jpeg",
  },
  {
    id: "8",
    name: "Whiskers",
    type: "Cat",
    image: "/dog 6. ",
  },
  {
    id: "9",
    name: "Yuki",
    type: "Dog",
    image: "/dog 4.jpg",
  },
  {
    id: "10",
    name: "Snowball",
    type: "Cat",
    image: "/cat 2.jpeg",
  },
];
