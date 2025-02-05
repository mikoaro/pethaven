export type DisclaimerType = {
  id: string;
  title: string;
  description?: string;
};

export type AgreementStep = {
  id: number;
  title: string;
};

export type AdoptionAgreement = {
  agreedToTerms: boolean;
  dateAgreed?: Date;
};
