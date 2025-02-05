"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useAdoptionApplication } from "@/contexts/AdoptionApplicationContext";
import { API_URL_LOCAL } from "@/utils/constants";

const totalPrice = 2000; // this means 12 usd and it should be calculated from the items or in the backend

interface PaymentFormProps {
  amount: number;
  onNext: () => void;
  onBack: () => void;
}

export function PaymentForm({ amount, onNext, onBack }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const { newAdoptionApplicationData, LOCAL_STORAGE_KEY } =
      useAdoptionApplication();

  // create a payment intent
  useEffect(() => {
    fetch(`${API_URL_LOCAL}/payments/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newAdoptionApplicationData.total * 1000 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {},
  };

  // handle input errors
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      // onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold">Payment</h2>
      <p className="text-gray-600">Total amount: ${newAdoptionApplicationData.total}</p>
      {/* ${amount.toFixed(2)}</p> */}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name on Card</Label>
          <Input id="name" required />
        </div>

        <div>
          <Label htmlFor="card-element">Credit or debit card</Label>
          <div className="mt-1 p-3 border rounded-md">
            {/* <CardElement id="card-element" /> */}
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="">
        <div className="flex flex-row gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="basis-1/2 "
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!stripe || processing || disabled || succeeded}
            className="basis-1/2  bg-blue-500 hover:bg-blue-600 text-white w-full"
          >
            {processing ? "Processing..." : "Pay Now"}
          </Button>
        </div>

        {succeeded && (
          <div className="py-8 space-y-3">
            <p>
              Payment succeeded, see the result in your
              <a href={`https://dashboard.stripe.com/test/payments`} rel="noopener noreferrer" target="_blank">
                {" "}
                Stripe dashboard.
              </a>{" "}
              Refresh the page to pay again.
            </p>
            <Button
              onClick={onNext}
              // className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              className={
                succeeded
                  ? "result-message bg-blue-500 hover:bg-blue-600 text-white"
                  : "result-message hidden bg-blue-500 hover:bg-blue-600 text-white"
              }
            >
              Continue
            </Button>
          </div>
        )}

        {/* <div className={succeeded ? "result-message" : "result-message hidden"}>
          <p >
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a>{" "}
            Refresh the page to pay again.
          </p>
        </div> */}
      </div>
    </form>
  );
}
