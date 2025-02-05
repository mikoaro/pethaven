import express from "express";
import { getOrders, getOrder, addOrder } from "./controller.js";

const orders = express.Router();

orders.get("/", getOrders);
orders.get("/:id", getOrder);
orders.post("/", addOrder);

export default orders;
