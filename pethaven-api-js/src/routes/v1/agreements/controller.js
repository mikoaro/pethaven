import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import docusign from "docusign-esign";
import fs from "fs";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import appRoot from "app-root-path";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const rootDir = path.join(__dirname, "..");

const currentFilePath = __filename; // Absolute path of the current file
const currentDirPath = __dirname; // Absolute path of the current directory
const parentDirPath = path.dirname(currentDirPath); // Absolute path of the parent directory

const ACCOUNT_ID =
  process.env.ACCOUNT_ID || "a4a7692a-3100-488b-9bbc-fbb04a153a42";

export const listAgreements = async (request, response) => {
  response.status(200).json([]);
};

export const getAgreement = (request, response) => {
  response.status(200).json({ id: 1, name: "Agreement 1" });
};

export const getUrl = async (request, response) => {
  console.log(request.body.name);
  console.log(request.body.email);
  console.log(request.body.company);

  await checkToken(request);
  let envelopesApi = getEnvelopesApi(request);
  let envelope = makeEnvelope(
    request.body.name,
    request.body.email,
    request.body.company
  );

  let results = await envelopesApi.createEnvelope(process.env.ACCOUNT_ID, {
    envelopeDefinition: envelope,
  });
  console.log("envelope results ", results);
  // Create the recipient view, the Signing Ceremony
  let viewRequest = makeRecipientViewRequest(
    request.body.name,
    request.body.email
  );
  results = await envelopesApi.createRecipientView(
    process.env.ACCOUNT_ID,
    results.envelopeId,
    { recipientViewRequest: viewRequest }
  );

  console.log("resutls url");
  console.log(results.url);
  response.send(JSON.stringify({ message: "Success", url: results.url }));

  // response.redirect(results.url);
  // response.send(results.url);
};

function getEnvelopesApi(request) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(process.env.BASE_PATH);
  dsApiClient.addDefaultHeader(
    "Authorization",
    "Bearer " + request.session.access_token
  );
  return new docusign.EnvelopesApi(dsApiClient);
}

function makeEnvelope(name, email, company) {
  let env = new docusign.EnvelopeDefinition();
  env.templateId = process.env.TEMPLATE_ID;
  let text = docusign.Text.constructFromObject({
    tabLabel: "company_name",
    value: company,
  });

  // Pull together the existing and new tabs in a Tabs object:
  let tabs = docusign.Tabs.constructFromObject({
    textTabs: [text],
  });

  let signer1 = docusign.TemplateRole.constructFromObject({
    email: email,
    name: name,
    tabs: tabs,
    clientUserId: process.env.CLIENT_USER_ID,
    roleName: "Adopter",
  });

  env.templateRoles = [signer1];
  env.status = "sent";

  return env;
}

function makeRecipientViewRequest(name, email) {
  let viewRequest = new docusign.RecipientViewRequest();

  // viewRequest.returnUrl = "http://localhost:3001/admin/orders";
  viewRequest.returnUrl = `${process.env.PETHAVEN_URL}:${process.env.PETHAVEN_PORT}/admin/orders`;
  viewRequest.authenticationMethod = "none";

  // Recipient information must match embedded recipient info
  // we used to create the envelope.
  viewRequest.email = email;
  viewRequest.userName = name;
  viewRequest.clientUserId = process.env.CLIENT_USER_ID;

  return viewRequest;
}

async function checkToken(request) {
  console.log("Current File Path:", currentFilePath);
  console.log("Current Directory Path:", currentDirPath);
  console.log("Parent Directory Path:", parentDirPath);
  console.log(rootDir);
  console.log(appRoot.path);

  if (request.session.access_token && Date.now() < request.session.expires_at) {
    console.log("re-using access_token ", request.session.access_token);
  } else {
    console.log("generating a new access token");
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.BASE_PATH);
    const results = await dsApiClient.requestJWTUserToken(
      process.env.INTEGRATION_KEY,
      process.env.USER_ID,
      "signature",
      fs.readFileSync(path.join(appRoot.path, "private.key")),
      3600000
    );
    console.log(results.body);
    request.session.access_token = results.body.access_token;
    request.session.expires_at =
      Date.now() + (results.body.expires_in - 60) * 100000000;
  }
}

export const getAgreementsMainHome = async (request, response) => {
  await checkToken(request);
  response.sendFile(path.join(appRoot.path, "main.html"));
};

export const getAgreementsSuccess = (request, response) => {
  response.send("Success");
};

// https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=(YOUR CLIENT ID)&redirect_uri=http://localhost:8000/

// https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=31f8ef05-0b58-4696-a354-58599ed2b3a4&redirect_uri=http://localhost:8000/
// https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=31f8ef05-0b58-4696-a354-58599ed2b3a4&redirect_uri=http://localhost:8000/callback
