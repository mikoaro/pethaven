"use client";
import { useRouter } from "next/navigation";
import type { Pet } from "@/types/admin/pet";
import { PetForm } from "@/components/admin/pet-form";
// import { toast } from "@/components/ui/use-toast";
// import { toast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast";
import { API_URL_LOCAL } from "@/utils/constants";

export default function NewPet() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (pet: Omit<Pet, "pet_id">) => {
    const formData = new FormData();

    Object.entries(pet).forEach(([key, value]) => {
      if (key === "images") {
        // Skip images, we'll handle them separately
        return;
      }
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    // Append each image file
    pet.images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    // const url = "/api/pets";
    const url = `${API_URL_LOCAL}/pets`;

    console.log("url");
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast({
        title: "Success",
        description: "New pet added successfully.",
      });
      router.push("/");
    } else {
      toast({
        title: "Error",
        description: "Failed to add new pet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-4">Add New Pet</h1>
      <PetForm onSubmit={handleSubmit} />
    </div>
  );
}
