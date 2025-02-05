import { NextResponse } from "next/server";
import { getPet, updatePet, deletePet } from "@/lib/pets";
import { writeFile } from "fs/promises";
import { join } from "path";
import type { Pet } from "@/types/pet";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const pet = getPet(params.id);
  if (pet) {
    return NextResponse.json(pet);
  } else {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const breed = formData.get("breed") as string;
  const age = formData.get("age") ? Number(formData.get("age")) : undefined;
  const description = formData.get("description") as string;
  const behavioralDisclaimer = formData.get("behavioralDisclaimer") as string;
  const medicalDisclaimer = formData.get("medicalDisclaimer") as string;
  const needsSponsorship = formData.get("needsSponsorship") === "true";
  const newImages = formData.getAll("images") as File[];
  const existingImages = formData.getAll("existingImages") as string[];

  const imageUrls: string[] = [...existingImages];

  for (const image of newImages) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("public", "uploads", image.name);
    await writeFile(path, buffer);
    imageUrls.push(`/uploads/${image.name}`);
  }

  const updatedPet: Omit<Pet, "id"> = {
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

  const pet = updatePet(params.id, updatedPet);
  if (pet) {
    return NextResponse.json(pet);
  } else {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = deletePet(params.id);
  if (success) {
    return NextResponse.json({ message: "Pet deleted successfully" });
  } else {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  }
}
