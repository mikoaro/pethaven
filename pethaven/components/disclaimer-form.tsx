"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { DisclaimerType } from "@/types/agreement";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";

interface DisclaimerFormProps {
  disclaimers: DisclaimerType[];
  onNext: () => void;
  onBack: () => void;
}

export function DisclaimerForm({
  disclaimers,
  onNext,
  onBack,
}: DisclaimerFormProps) {
  const [agreed, setAgreed] = useState(false);

  const {
    selectedPet,
    newAdoptionApplicationData,
    setSelectedPet,
    LOCAL_STORAGE_KEY,
    dataLoaded,
    setDataLoaded,
    defaultAdoptionApplicationData,
    setNewAdoptionApplicationData,
  } = useAdoptionApplication();

  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!loadedDataString)
      return setNewAdoptionApplicationData(defaultAdoptionApplicationData);

    setNewAdoptionApplicationData(JSON.parse(loadedDataString));
    return;
  };

  useEffect(() => {
    if (dataLoaded) {
      readFromLocalStorage();
    }
  }, [dataLoaded]);

  // console.log(pet)
  console.log(newAdoptionApplicationData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      onNext();
    }
  };

  const disclaimers2: DisclaimerType[] = [
    { id: "1", title: "Disclaimers" },
    { id: "2", title: "Media Hold" },
    { id: "3", title: "Loves Peanut Butter" },
    { id: "4", title: "Food Aggressive" },
    { id: "5", title: "Guards Toys" },
    {
      id: "6",
      title: "Bella needs help being trained.",
      description: "This pet requires additional training and patience.",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Disclaimers:</h2>

        <div className="space-y-4">
          <div className="font-medium">
            {newAdoptionApplicationData.pet.behavioral_disclaimer.statement}
          </div>
          {newAdoptionApplicationData.pet.behavioral_disclaimer.known_behavioral_traits.map(
            (disclaimer, index) => (
              <div key={index} className="text-gray-600">
                <div className="font-medium">{disclaimer.trait}</div>
                {disclaimer.description && (
                  <p className="text-sm mt-1">{disclaimer.description}</p>
                )}
              </div>
            )
          )}
          {newAdoptionApplicationData.pet.behavioral_disclaimer.training_recommendations.map(
            (disclaimer, index) => (
              <div key={index} className="text-gray-600">
                <div className="font-medium">{disclaimer.recommendation}</div>
                {disclaimer.description && (
                  <p className="text-sm mt-1">{disclaimer.description}</p>
                )}
              </div>
            )
          )}
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
