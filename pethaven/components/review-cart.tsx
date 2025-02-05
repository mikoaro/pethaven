import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Pet, CartDetails } from "@/types/adoption-application";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";
import { useEffect } from "react";

interface ReviewCartProps {
  pet: Pet;
  cartDetails: CartDetails;
  onNext: () => void;
}

export function ReviewCart({ pet, cartDetails, onNext }: ReviewCartProps) {
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
      setNewAdoptionApplicationData(defaultAdoptionApplicationData);
    else setNewAdoptionApplicationData(JSON.parse(loadedDataString));

    console.log("review-cart");
    console.log(newAdoptionApplicationData);
  };

  useEffect(() => {
    readFromLocalStorage();
  }, [dataLoaded]);

  // console.log(pet)
  // console.log(newAdoptionApplicationData);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Review</h2>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="aspect-square relative max-w-md mx-auto">
            <Image
              src={newAdoptionApplicationData.petImage || "/placeholder.svg"}
              alt={newAdoptionApplicationData.petName}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-medium">
                  {newAdoptionApplicationData.petName}
                </h3>
                <p className="text-gray-500">
                  {newAdoptionApplicationData.petType} -{" "}
                  {newAdoptionApplicationData.petSize}
                </p>
              </div>
              <span className="text-xl">
                ${newAdoptionApplicationData.petPrice}
              </span>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${newAdoptionApplicationData.petPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${newAdoptionApplicationData.salesTax}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{newAdoptionApplicationData.subTotal}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onNext}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        Continue
      </Button>
    </div>
  );
}
