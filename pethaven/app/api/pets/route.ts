import { NextResponse } from "next/server";
import { getPets, addPet } from "@/lib/pets";
import type { Pet } from "@/types/pet";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const pets = getPets();
  return NextResponse.json(pets);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const breed = formData.get("breed") as string;
  const age = formData.get("age") ? Number(formData.get("age")) : undefined;
  const description = formData.get("description") as string;
  const behavioralDisclaimer = formData.get("behavioralDisclaimer") as string;
  const medicalDisclaimer = formData.get("medicalDisclaimer") as string;
  const needsSponsorship = formData.get("needsSponsorship") === "true";
  const images = formData.getAll("images") as File[];

  const imageUrls: string[] = [];

  for (const image of images) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("public", "uploads", image.name);
    await writeFile(path, buffer);
    imageUrls.push(`/uploads/${image.name}`);
  }

  const pet: Omit<Pet, "id"> = {
    name,
    type,
    breed,
    age,
    description,
    behavioralDisclaimer,
    medicalDisclaimer,
    needsSponsorship,
    images: imageUrls,
  };

  const newPet = addPet(pet);
  return NextResponse.json(newPet, { status: 201 });
}
