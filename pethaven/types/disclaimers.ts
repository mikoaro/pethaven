export type Disclaimer = {
  id: string;
  title: string;
  description?: string;
};

export type DisclaimerStep = {
  id: number;
  title: string;
};

export type AdoptionFormData = {
  agreedToDisclaimers: boolean;
};
