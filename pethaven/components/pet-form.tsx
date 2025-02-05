"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Pet, PetType } from "@/types/pet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";

interface PetFormProps {
  pet?: Pet;
}

const petTypes: PetType[] = [
  "dog",
  "cat",
  "fish",
  "rabbit",
  "hamster",
  "guinea pig",
  "turtle",
  "lizard",
  "bird",
  "other",
];

export function PetForm({ pet }: PetFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Omit<Pet, "id">>({
    name: pet?.name || "",
    type: pet?.type || "dog",
    breed: pet?.breed || "",
    age: pet?.age || undefined,
    description: pet?.description || "",
    behavioralDisclaimer: pet?.behavioralDisclaimer || "",
    medicalDisclaimer: pet?.medicalDisclaimer || "",
    needsSponsorship: pet?.needsSponsorship || false,
    images: pet?.images || [],
    location: pet?.location || "",
    status: pet?.status || "available",
    birthDate: pet?.birthDate || "",
    gender: pet?.gender || "unknown",
    weight: pet?.weight || 0,
  });
  const [previewImages, setPreviewImages] = useState<string[]>(
    pet?.images || []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as PetType }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, needsSponsorship: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((image: File | string, index: number) => {
          if (image instanceof File) {
            formDataToSend.append(`images`, image);
          } else if (typeof image === "string" && image.startsWith("http")) {
            formDataToSend.append(`existingImages`, image);
          }
        });
      } else if (value !== undefined) {
        formDataToSend.append(key, value.toString());
      }
    });

    const url = pet ? `/api/pets/${pet.id}` : "/api/pets";
    const method = pet ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      body: formDataToSend,
    });

    if (response.ok) {
      router.push("/admin/pets");
    } else {
      console.error("Failed to save pet");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 shadow-xl p-10 rounded-xl">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          name="type"
          value={formData.type}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select pet type" />
          </SelectTrigger>
          <SelectContent>
            {petTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="breed">Breed</Label>
        <Input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="behavioralDisclaimer">Behavioral Disclaimer</Label>
        <Textarea
          id="behavioralDisclaimer"
          name="behavioralDisclaimer"
          value={formData.behavioralDisclaimer}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="medicalDisclaimer">Medical Disclaimer</Label>
        <Textarea
          id="medicalDisclaimer"
          name="medicalDisclaimer"
          value={formData.medicalDisclaimer}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="needsSponsorship"
          checked={formData.needsSponsorship}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="needsSponsorship">Needs Sponsorship</Label>
      </div>
      <div>
        {/* <Label htmlFor="images">Images</Label> */}
        <Input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          ref={fileInputRef}
        />
        <Button type="button" onClick={() => fileInputRef.current?.click()}>
          Upload Images
        </Button>
        <div className="mt-2 flex flex-wrap gap-2">
          {previewImages.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
                width={24}
                height={24} 
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit">{pet ? "Update Pet" : "Add Pet"}</Button>
    </form>
  );
}
