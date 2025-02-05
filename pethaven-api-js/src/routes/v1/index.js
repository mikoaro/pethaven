import express from "express";
import agreements from "./agreements/index.js";
import contacts from "./contacts/index.js";
import orders from "./orders/index.js";
import pets from "./pets/index.js";
import payments from "./payments/index.js";

const v1 = express.Router();

v1.use("/agreements", agreements);
v1.use("/contacts", contacts);
v1.use("/orders", orders);
v1.use("/pets", pets);
v1.use("/payments", payments);

export default v1;
