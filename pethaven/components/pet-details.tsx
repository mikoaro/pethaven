import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";
import type { Pet } from "@/types/admin/pet";
import { NewAdoptionInitialValuesType } from "@/types/adoption-application";
import { CartDetails } from "@/types/adoption-process";
import Link from "next/link";

interface PetDetailsProps {
  pet: Pet;
}

const cartDetails: CartDetails = {
  subtotal: 200.0,
  tax: 8.25,
  total: 204.42,
};

export function PetDetails({ pet }: PetDetailsProps) {
  const {
    selectedPet,
    newAdoptionApplicationData,
    setSelectedPet,
    LOCAL_STORAGE_KEY,
    dataLoaded,
    setDataLoaded,
    resetLocalStorage,
  } = useAdoptionApplication();

  const formatCurrency = (number: number, locale: string, currency: string) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(number);
  };

  const getPetSize = (weightRange: string) => {
    let size;
    switch (weightRange) {
      case "~10kg":
        size = "Small";
        return size;
      case "10-20kg":
        size = "Medium";
        return size;
      case "20kg~":
        size = "Large";
        return size;
    }
  };

  const saveDataToLocalStorage = (
    newAdoptionApplicationData: NewAdoptionInitialValuesType
  ) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newAdoptionApplicationData)
    );
  };

  const setNewAdoptionApplicationData = async () => {
    newAdoptionApplicationData.petPrice = cartDetails.subtotal;
    newAdoptionApplicationData.salesTax = cartDetails.tax;
    newAdoptionApplicationData.subTotal = formatCurrency(
      cartDetails.subtotal + (cartDetails.subtotal * cartDetails.tax) / 100,
      "en-US",
      "USD"
    );
    newAdoptionApplicationData.petId = selectedPet.id;
    newAdoptionApplicationData.petName = selectedPet.name;
    newAdoptionApplicationData.petType = selectedPet.type;
    newAdoptionApplicationData.petAge = Number(selectedPet.age);
    newAdoptionApplicationData.petImage = selectedPet.images[0];
    newAdoptionApplicationData.petSize = getPetSize(selectedPet.size);
    newAdoptionApplicationData.contactName = "test-admin";
    newAdoptionApplicationData.contactFirstName = "Jane";
    newAdoptionApplicationData.contactLastName = "Doe";
    newAdoptionApplicationData.status = "Draft";
    newAdoptionApplicationData.pet = pet

    console.log(newAdoptionApplicationData);
    saveDataToLocalStorage(newAdoptionApplicationData);
    setDataLoaded(true);
  };

  const handleClick = () => {
    // Handle the click event here
    console.log("Button clicked!");
    setNewAdoptionApplicationData();
    // console.log(newAdoptionApplicationData);
  };

  return (
    <Card className="mt-8 p-8 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold mb-6">Details</h2>
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div className="text-gray-600">PH No.</div>
            <div>PH-{pet.id}</div>
            {/* <div className="text-gray-600">Arrived at PH</div>
            <div>{pet.arrivedAt}</div> */}
            <div className="text-gray-600">Location</div>
            <div>{pet.location?.city}</div>
            <div className="text-gray-600">Sex</div>
            <div>{pet.sex}</div>
            <div className="text-gray-600">Age</div>
            <div>{pet.age} years</div>
            <div className="text-gray-600">Weight</div>
            <div>{pet.size}</div>
            <div className="text-gray-600">Breed</div>
            <div>{pet.breed}</div>
            {/* <div className="text-gray-600">Background</div>
            <div>{pet.background}</div> */}
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">{pet.description}</p>
          <Button
            asChild
            className="w-full bg-black text-white hover:bg-gray-900 rounded-full py-6 text-base"
            onClick={handleClick}
          >
            <Link href="/app/pets/adoption-application">
              Adoption Application
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
