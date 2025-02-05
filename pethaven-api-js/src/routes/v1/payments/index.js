import express from "express";
import { createPaymentIntent } from "./controller.js";

const payments = express.Router();

payments.post("/create-payment-intent", createPaymentIntent);

export default payments;