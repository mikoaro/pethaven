export const API_URL: string = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";
export const MAX_RETRIES: number = 3;
export const API_URL_LOCAL: string = process.env.NEXT_PUBLIC_API_URL_LOCAL || "http://3.209.80.226:3070/v1";
// export const API_URL_LOCAL: string = process.env.NEXT_PUBLIC_API_URL_LOCAL || 'http://localhost:8000/v1';
export const SITE_TITLE: string = "PetHaven App";
export const SITE_DESCRIPTION: string = "PetHaven next app";
export const MAX_ITEMS_PER_PAGE: number = 10;
export const STRIPE_PUBLIC_KEY: string = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
export const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || ""


