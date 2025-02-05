import express from "express";
import { getContacts, getContact, addContact } from "./controller.js";

const contacts = express.Router();

contacts.get("/", getContacts);
contacts.get("/:id", getContact);
contacts.post("/", addContact);

export default contacts;
