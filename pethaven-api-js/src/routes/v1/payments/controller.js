import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Payment Intent (returns the client with a temporary secret)
export const createPaymentIntent = async (request, response) => {
  const { price } = request.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
  });

  response.send({
    clientSecret: paymentIntent.client_secret,
  });
};
