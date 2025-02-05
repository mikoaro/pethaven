export type SupportInitiativeFormData = {
  title: string;
  location: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  description: string;
  partnerAgency?: string;
  coverImage?: File;
  isFinancialSupport: boolean;
  rewardAmount?: number;
};

export type Step = {
  id: number;
  title: string;
  description?: string;
};
