import express from "express";
import { getPets, getPet, addPet } from "./controller.js";
import multer from "multer";
const upload = multer(); // creates a middleware that parses form data

const pets = express.Router();

pets.get("/", getPets);
pets.get("/:id", getPet);
pets.post("/", upload.array("images"), addPet);

export default pets;
