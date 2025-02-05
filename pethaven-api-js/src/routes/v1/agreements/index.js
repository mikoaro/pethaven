import express from "express";
import { listAgreements, getAgreement, getUrl, getAgreementsMainHome, getAgreementsSuccess } from "./controller.js";

const agreements = express.Router();

agreements.get("/", listAgreements);
// agreements.get("/:id", getAgreement);
agreements.post("/form", getUrl);
agreements.get("/main", getAgreementsMainHome);
agreements.get("/success", getAgreementsSuccess);

export default agreements;
