"use client";

import { useState, useRef, useEffect } from "react";
import type { Pet } from "@/types/admin/pet";
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
import { X, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL_LOCAL } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface PetFormProps {
  pet?: Pet;
  onSubmit: (pet: Omit<Pet, "pet_id">) => void;
}

export function PetForm({ pet, onSubmit }: PetFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Omit<Pet, "pet_id">>({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    sex: "Male",
    color: "",
    size: "10-20kg",
    spayed_neutered: false,
    microchip_id: "",
    description: "",
    location: {
      shelter_name: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
      email: "",
    },
    medical_disclaimer: {
      statement: "",
      current_medications: [],
      veterinary_recommendations: "",
    },
    behavioral_disclaimer: {
      statement: "",
      known_behavioral_traits: [],
      training_recommendations: [],
    },
    adoption_details: {
      adoption_fee: 0,
      required_documents: [],
    },
    status: "Available for Adoption",
    needs_sponsorship: false,
    images: pet?.images || [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (pet) {
      setFormData(pet);
      setPreviewImages(pet.images);
    }
  }, [pet]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    console.log("formData")
    console.log(formData)

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((image: File | string, index: number) => {
          if (image instanceof File) {
            formDataToSend.append(`images`, image);
          } else if (typeof image === "string" && image.startsWith("http")) {
            formDataToSend.append(`existingImages`, image);
          }
        });
      } else if ( typeof value === "object") {
        formDataToSend.append(key, JSON.stringify(value));
      
      } else if (value !== undefined) {
        // console.log(key)
        // console.log(JSON.stringify(value))
        // formDataToSend.append(key, JSON.stringify(formData));
        formDataToSend.append(key, String(value));
      }
    });

    // formDataToSend.append("odata", JSON.stringify(formData));

    // const url = "/api/pets";
    const url = `${API_URL_LOCAL}/pets`;

    console.log("url");
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      body: formDataToSend,
    });

    if (response.ok) {
      router.push("/admin/pets");
    } else {
      console.error("Failed to save pet");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
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

  const handleAddMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medical_disclaimer: {
        ...prev.medical_disclaimer,
        current_medications: [
          ...prev.medical_disclaimer.current_medications,
          { name: "", dosage: "" },
        ],
      },
    }));
  };

  const handleRemoveMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medical_disclaimer: {
        ...prev.medical_disclaimer,
        current_medications: prev.medical_disclaimer.current_medications.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleMedicationChange = (
    index: number,
    field: "name" | "dosage",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      medical_disclaimer: {
        ...prev.medical_disclaimer,
        current_medications: prev.medical_disclaimer.current_medications.map(
          (med, i) => (i === index ? { ...med, [field]: value } : med)
        ),
      },
    }));
  };

  const handleAddBehavioralTrait = () => {
    setFormData((prev) => ({
      ...prev,
      behavioral_disclaimer: {
        ...prev.behavioral_disclaimer,
        known_behavioral_traits: [
          ...prev.behavioral_disclaimer.known_behavioral_traits,
          { trait: "", description: "" },
        ],
      },
    }));
  };

  const handleRemoveBehavioralTrait = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      behavioral_disclaimer: {
        ...prev.behavioral_disclaimer,
        known_behavioral_traits:
          prev.behavioral_disclaimer.known_behavioral_traits.filter(
            (_, i) => i !== index
          ),
      },
    }));
  };

  const handleBehavioralTraitChange = (
    index: number,
    field: "trait" | "description",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      behavioral_disclaimer: {
        ...prev.behavioral_disclaimer,
        known_behavioral_traits:
          prev.behavioral_disclaimer.known_behavioral_traits.map((trait, i) =>
            i === index ? { ...trait, [field]: value } : trait
          ),
      },
    }));
  };

  const handleAddTrainingRecommendation = () => {
    setFormData((prev) => ({
      ...prev,
      behavioral_disclaimer: {
        ...prev.behavioral_disclaimer,
        training_recommendations: [
          ...prev.behavioral_disclaimer.training_recommendations,
          { recommendation: "", description: "" },
        ],
      },
    }));
  };

  const handleRemoveTrainingRecommendation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      behavioral_disclaimer: {
        ...prev.behavioral_disclaimer,
        training_recommendations:
          prev.behavioral_disclaimer.training_recommendations.filter(
            (_, i) => i !== index
          ),
      },
    }));
  };

  const handleTrainingRecommendationChange = (
    index: number,
    field: "recommendation" | "description",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      behavioral_disclaimer: {
        ...prev.behavioral_disclaimer,
        training_recommendations:
          prev.behavioral_disclaimer.training_recommendations.map((rec, i) =>
            i === index ? { ...rec, [field]: value } : rec
          ),
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              type: value as "Dog" | "Cat" | "Others",
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dog">Dog</SelectItem>
            <SelectItem value="Cat">Cat</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
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
          required
        />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="sex">Sex</Label>
        <Select
          name="sex"
          value={formData.sex}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              sex: value as "Male" | "Female",
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="size">Size</Label>
        <Select
          name="size"
          value={formData.size}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              size: value as "~10kg" | "10-20kg" | "20kg~",
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="~10kg">~10kg</SelectItem>
            <SelectItem value="10-20kg">10-20kg</SelectItem>
            <SelectItem value="20kg~">20kg~</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="spayed_neutered"
          checked={formData.spayed_neutered}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              spayed_neutered: checked as boolean,
            }))
          }
        />
        <Label htmlFor="spayed_neutered">Spayed/Neutered</Label>
      </div>
      <div>
        <Label htmlFor="microchip_id">Microchip ID</Label>
        <Input
          id="microchip_id"
          name="microchip_id"
          value={formData.microchip_id}
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
          rows={4}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="shelter_name">Shelter Name</Label>
            <Input
              id="shelter_name"
              name="shelter_name"
              value={formData.location.shelter_name}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.location.address}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.location.city}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.location.state}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="zip_code">Zip Code</Label>
            <Input
              id="zip_code"
              name="zip_code"
              value={formData.location.zip_code}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.location.phone}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.location.email}
              onChange={handleLocationChange}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="medical_statement">Statement</Label>
            <Textarea
              id="medical_statement"
              name="medical_statement"
              value={formData.medical_disclaimer.statement}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  medical_disclaimer: {
                    ...prev.medical_disclaimer,
                    statement: e.target.value,
                  },
                }))
              }
              rows={4}
            />
          </div>
          <div>
            <Label>Current Medications</Label>
            {formData.medical_disclaimer.current_medications.map(
              (med, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    placeholder="Medication name"
                    value={med.name}
                    onChange={(e) =>
                      handleMedicationChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) =>
                      handleMedicationChange(index, "dosage", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveMedication(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddMedication}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Medication
            </Button>
          </div>
          <div>
            <Label htmlFor="veterinary_recommendations">
              Veterinary Recommendations
            </Label>
            <Textarea
              id="veterinary_recommendations"
              name="veterinary_recommendations"
              value={formData.medical_disclaimer.veterinary_recommendations}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  medical_disclaimer: {
                    ...prev.medical_disclaimer,
                    veterinary_recommendations: e.target.value,
                  },
                }))
              }
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Behavioral Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="behavioral_statement">Statement</Label>
            <Textarea
              id="behavioral_statement"
              name="behavioral_statement"
              value={formData.behavioral_disclaimer.statement}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  behavioral_disclaimer: {
                    ...prev.behavioral_disclaimer,
                    statement: e.target.value,
                  },
                }))
              }
              rows={4}
            />
          </div>
          <div>
            <Label>Known Behavioral Traits</Label>
            {formData.behavioral_disclaimer.known_behavioral_traits.map(
              (trait, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    placeholder="Trait"
                    value={trait.trait}
                    onChange={(e) =>
                      handleBehavioralTraitChange(
                        index,
                        "trait",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Description"
                    value={trait.description}
                    onChange={(e) =>
                      handleBehavioralTraitChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveBehavioralTrait(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddBehavioralTrait}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Behavioral Trait
            </Button>
          </div>
          <div>
            <Label>Training Recommendations</Label>
            {formData.behavioral_disclaimer.training_recommendations.map(
              (rec, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    placeholder="Recommendation"
                    value={rec.recommendation}
                    onChange={(e) =>
                      handleTrainingRecommendationChange(
                        index,
                        "recommendation",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Description"
                    value={rec.description}
                    onChange={(e) =>
                      handleTrainingRecommendationChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveTrainingRecommendation(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTrainingRecommendation}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Training Recommendation
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="adoption_fee">Adoption Fee</Label>
        <Input
          id="adoption_fee"
          name="adoption_fee"
          type="number"
          value={formData.adoption_details.adoption_fee}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              adoption_details: {
                ...prev.adoption_details,
                adoption_fee: Number(e.target.value),
              },
            }))
          }
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="needs_sponsorship"
          checked={formData.needs_sponsorship}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              needs_sponsorship: checked as boolean,
            }))
          }
        />
        <Label htmlFor="needs_sponsorship">Needs Sponsorship</Label>
      </div>
      <div>
        <Label htmlFor="images">Images</Label>
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
              <img
                src={image || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
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
