"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { ReviewCart } from "@/components/review-cart";
import { DisclaimerForm } from "@/components/disclaimer-form";
import { AdoptionAgreement } from "@/components/adoption-agreement";
import { ApplicationForm } from "@/components/application-form";
import type {
  Step,
  Pet,
  CartDetails,
  DisclaimerType,
} from "@/types/adoption-process";
import { DonationForm } from "@/components/donation-form";
import { PaymentForm } from "@/components/payment-form";

const stripePromise = loadStripe("your-publishable-key-here");

const steps: Step[] = [
  { id: 1, title: "Review Cart", isCompleted: false },
  { id: 2, title: "Disclaimers", isCompleted: false },
  { id: 3, title: "Adoption Agreement", isCompleted: false },
  { id: 4, title: "Donation", isCompleted: false },
  { id: 5, title: "Payment", isCompleted: false },
  { id: 6, title: "Application", isCompleted: false },
];

const samplePet: Pet = {
  id: "1",
  name: "Bella",
  type: "Dog",
  age: "Adult",
  price: 200.0,
  imageUrl:
    "/dog 1.jpeg",
};

const cartDetails: CartDetails = {
  subtotal: 200.0,
  tax: 4.42,
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

const Stepper = ({ steps, currentStep }: { steps: Step[]; currentStep: number }) => {
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
                    isCompleted || isActive
                      ? "text-blue-500"
                      : "text-gray-500"
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
                {isCompleted ? "Completed" : isActive ? "In Progress" : "Pending"}
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
    router.push("/adoption-complete");
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
            <DisclaimerForm
              disclaimers={disclaimers}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <AdoptionAgreement onSubmit={handleNext} onBack={handleBack} />
          )}

          {currentStep === 4 && (
            <DonationForm onNext={handleDonationSubmit} onBack={handleBack} />
          )}

          {currentStep === 5 && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={cartDetails.total + donationAmount}
                onNext={handleNext}
                onBack={handleBack}
              />
            </Elements>
          )}

          {currentStep === 6 && (
            <ApplicationForm onSubmit={handleComplete} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
}
