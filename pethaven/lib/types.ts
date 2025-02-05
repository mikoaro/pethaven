export interface Pet {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  color: string;
  size: string;
  goodWith: string[];
  description: string;
  image: string;
  additionalImages: string[];
}

export type SupportInitiativeForm = {
  title: string;
  location: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  description: string;
  partnerAgency?: string;
  financialSupport: boolean;
  coverImage?: File;
};

export type Step = {
  id: number;
  name: string;
  fields: (keyof SupportInitiativeForm)[];
};

export const steps: Step[] = [
  {
    id: 1,
    name: "General Information",
    fields: [
      "title",
      "location",
      "startDate",
      "endDate",
      "description",
      "partnerAgency",
      "coverImage",
    ],
  },
  {
    id: 2,
    name: "Reward Amount",
    fields: ["financialSupport"],
  },
  {
    id: 3,
    name: "Summary",
    fields: [],
  },
];
