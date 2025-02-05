"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { API_URL_LOCAL } from "@/utils/constants";

interface AdoptionAgreementProps {
  onSubmit: () => void;
  onBack: () => void;
}

export function AdoptionAgreement({
  onSubmit,
  onBack,
}: AdoptionAgreementProps) {
  const [agreed, setAgreed] = useState(false);
  const currentDate = format(new Date(2025, 0, 27), "MMMM d, yyyy");
  const [postMessage, setPostMessage] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // await handlePost();
    router.push(postMessage);
    if (agreed) {
      onSubmit();
    }
  };

  const handlePost = async () => {
    const response = await fetch(`${API_URL_LOCAL}/agreements/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Jane Doe",
        email: "contact@pethaven.org",
        company: "PetHaven",
      }),
    });
    const data = await response.json();
    setPostMessage(data.url);
  };

  useEffect(() => {
    const handlePost = async () => {
      const response = await fetch(`${API_URL_LOCAL}/agreements/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Jane Doe",
          email: "contact@pethaven.org",
          company: "PetHaven",
        }),
      });
      const data = await response.json();
      setPostMessage(data.url);
    };
    handlePost();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Agreements:</h2>

        <div className="space-y-6 text-gray-600">
          <p>
            Before proceeding with the adoption process, we kindly ask all
            adopters (or sponsors) to review and sign the necessary agreement
            documents, such as our adoption contract or sponsorship terms, via
            DocuSign. This step ensures clarity on responsibilities, care
            expectations, and our commitment to the well-being of every animal.
          </p>

          <p>
            In consideration for receiving an animal from PetHaven Animal
            Shelter:
          </p>

          <p>
            I understand and agree to provide proper and sufficient food, water,
            shelter, exercise, veterinary care and loving humane treatment at
            all times.
          </p>

          <p>
            I understand that there is seven (7) day trial window. During this
            period, I have opportunity to make certain that the animal is right
            for my family and lifestyle.
          </p>

          <p>
            The seven (7) day trial begins the day that this Agreement is
            signed, which is {currentDate}.
          </p>

          <p>
            If I return the animal within the seven (7) day trial window, I will
            receive an adoption credit that can be used towards the adoption of
            another animal.
          </p>

          <p>
            I, the undersigned hereby certify that the information given to
            PetHaven Animal Shelter in my Adoption Application is truthful and
            accurate, and I certify that I am not under 18 years of age.
          </p>

          <p>
            If I breach any of the terms and conditions of this contract, by
            which I have agreed to forfeit custody, I AGREE that PetHaven Animal
            Shelter may repossess this animal.
          </p>

          <p>
            By signing, you acknowledge your readiness to provide a loving home
            or support for an animal in need. Your generosity and compassion
            make a life-changing difference!
          </p>

          <p>
            Thank you for being a part of our mission to give these animals a
            second chance. ❤️
          </p>

          <p>For any questions, feel free to contact us.</p>

          <p className="italic">This contract has been updated.</p>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="agreement"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="border-gray-300"
          />
          <Label htmlFor="agreement" className="text-gray-600">
            I agree
          </Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!agreed}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
