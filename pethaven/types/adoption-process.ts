export type Pet = {
  id: string;
  name: string;
  type: string;
  age: string;
  price: number;
  imageUrl: string;
};

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
