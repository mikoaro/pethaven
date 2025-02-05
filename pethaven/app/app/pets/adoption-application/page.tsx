"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { ReviewCart } from "@/components/review-cart";
import { DonationForm } from "@/components/donation-form";
import { PaymentForm } from "@/components/payment-form";
import { DisclaimerForm } from "@/components/disclaimer-form";
import { AdoptionAgreement } from "@/components/adoption-agreement";
import { STRIPE_PUBLIC_KEY } from "@/utils/constants";
// import { ApplicationForm } from "@/components/application-form";
import type {
  Step,
  Pet,
  CartDetails,
  DisclaimerType,
} from "@/types/adoption-process";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";
import { NewAdoptionInitialValuesType } from "@/types/adoption-application";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const steps: Step[] = [
  { id: 1, title: "Review Cart", isCompleted: false },
  { id: 2, title: "Donation", isCompleted: false },
  { id: 3, title: "Payment", isCompleted: false },
  { id: 4, title: "Disclaimers", isCompleted: false },
  { id: 5, title: "Adoption Agreement", isCompleted: false },
  // { id: 6, title: "Application", isCompleted: false },
];

// const steps: Step[] = [
//   { id: 1, title: "Review Cart", isCompleted: false },
//   { id: 2, title: "Disclaimers", isCompleted: false },
//   { id: 3, title: "Adoption Agreement", isCompleted: false },
//   { id: 4, title: "Donation", isCompleted: false },
//   { id: 5, title: "Payment", isCompleted: false },
//   { id: 6, title: "Application", isCompleted: false },
// ];

const samplePet: Pet = {
  id: "1",
  name: "Bella",
  type: "Dog",
  age: "Adult",
  price: 200.0,
  imageUrl: "/dog 1.jpeg",
};

const cartDetails: CartDetails = {
  subtotal: 200.0,
  tax: 8.25,
  total: 204.42,
};

const disclaimers: DisclaimerType[] = [
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

const Stepper = ({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.isCompleted;

        return (
          <div key={step.id} className="flex items-center w-full">
            {/* Step Circle and Info */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold ${
                  isCompleted
                    ? "bg-blue-500 text-white"
                    : isActive
                    ? "border-2 border-blue-500 text-blue-500"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.id}
              </div>
              <div className="mt-2 text-sm font-medium">
                <span
                  className={`${
                    isCompleted || isActive ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              <span
                className={`text-xs ${
                  isCompleted
                    ? "text-blue-500"
                    : isActive
                    ? "text-blue-400"
                    : "text-gray-400"
                }`}
              >
                {isCompleted
                  ? "Completed"
                  : isActive
                  ? "In Progress"
                  : "Pending"}
              </span>
            </div>

            {/* Line Connector */}
            {index < steps.length - 1 && (
              <div
                className={`flex-grow h-1 ${
                  isCompleted || steps[index + 1].isCompleted
                    ? "bg-blue-500"
                    : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function AdoptionProcessPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const router = useRouter();
  const [donationAmount, setDonationAmount] = useState(0);

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

  // useEffect(() => {
  //   resetLocalStorage();
  // });

  console.log(selectedPet);

  // {
  //   "petPrice": 0,
  //   "salesTax": 0,
  //   "donationAmount": 0,
  //   "total": "",
  //   "subTotal": "",
  //   "petId": "",
  //   "petName": "",
  //   "petType": "",
  //   "petAge": 0,
  //   "petImage": "",
  //   "petSize": "",
  //   "isSigned": false,
  //   "contactName": "",
  //   "contactFirstName": "",
  //   "contactLastName": "",
  //   "status": ""
  // }

  useEffect(() => {
    // setNewAdoptionApplicationData();
  });

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

    console.log(newAdoptionApplicationData);
    saveDataToLocalStorage(newAdoptionApplicationData);
    setDataLoaded(true);
  };

  const updateSteps = (steps: Step[], completed: number[]) => {
    return steps.map((step) => ({
      ...step,
      isCompleted: completed.includes(step.id),
    }));
  };

  const handleNext = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log("Adoption process completed!");
    // router.push("/adoption-complete");
    // handlePost()
  };


  const handlePost = async () => {
    const response = await fetch("http://localhost:8000/v1/agreements/form", {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Jane Doe",
        email: "admin@mikoaro.com",
        company: "PetHaven",
      }),
    });
    const data = await response.json();
    console.log(" Response: " + data.url);
    router.push(data.url);
  };

  const currentSteps = updateSteps(steps, completedSteps);

  function handleDonationSubmit(amount: number): void {
    setDonationAmount(amount);
    handleNext();
  }

  return (
    <div className="w-full min-h-screen bg-[#fdf6e7] py-20 mt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-12 ml-36">
          <Stepper steps={currentSteps} currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {currentStep === 1 && (
            <ReviewCart
              pet={samplePet}
              cartDetails={cartDetails}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <DonationForm onNext={handleDonationSubmit} onBack={handleBack} />
          )}

          {currentStep === 3 && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={cartDetails.total + donationAmount}
                onNext={handleNext}
                onBack={handleBack}
              />
            </Elements>
          )}

          {currentStep === 4 && (
            <DisclaimerForm
              disclaimers={disclaimers}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <AdoptionAgreement onSubmit={handleNext} onBack={handleBack} />
          )}

          {currentStep === 6 && (
            <ApplicationForm onSubmit={handleComplete} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
}
