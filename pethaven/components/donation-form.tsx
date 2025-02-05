"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";

interface DonationFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function DonationForm({ onNext, onBack }: DonationFormProps) {
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");

  const { newAdoptionApplicationData, LOCAL_STORAGE_KEY } =
    useAdoptionApplication();

  const formatCurrencyNumber = (number: number) => {
    console.log(number);
    return new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
    }).format(number);
  };

  const updateStorage = (finalDonationAmount: string) => {
    // Get the existing data from localStorage
    let existingData = localStorage.getItem(LOCAL_STORAGE_KEY);

    // If the data exists, parse it from JSON
    if (existingData !== null && existingData !== undefined && existingData !== "") {
      existingData = JSON.parse(existingData);

      // Update the data
      existingData.donationAmount = Number(finalDonationAmount);
      existingData.total = formatCurrencyNumber(
        existingData.petPrice +
          (existingData.petPrice * existingData.salesTax) / 100 +
          Number(finalDonationAmount)
      );

      newAdoptionApplicationData.donationAmount = Number(finalDonationAmount);
      newAdoptionApplicationData.total = existingData.total;

      // Store the updated data back in localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount =
      donationAmount === "custom" ? customAmount : donationAmount;
    console.log("Donation amount:", finalAmount);
    updateStorage(finalAmount);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold">Make a Donation</h2>
      <p className="text-gray-600">
        Your donation helps us care for more animals in need.
      </p>

      <RadioGroup
        value={donationAmount}
        onValueChange={setDonationAmount}
        className="space-y-4"
      >
        {["10", "25", "50", "100"].map((amount) => (
          <div key={amount} className="flex items-center space-x-2">
            <RadioGroupItem value={amount} id={`amount-${amount}`} />
            <Label htmlFor={`amount-${amount}`}>${amount}</Label>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="amount-custom" />
          <Label htmlFor="amount-custom">Custom amount</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-24"
            disabled={donationAmount !== "custom"}
          />
        </div>
      </RadioGroup>

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
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
