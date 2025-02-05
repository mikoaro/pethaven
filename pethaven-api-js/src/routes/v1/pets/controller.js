
import axios from "axios";
import { PinataSDK } from "pinata";
// import { Pet, PrismaClient } from "@prisma/client";
import pkg from '@prisma/client';
const { Pet, PrismaClient } = pkg;

const prisma = new PrismaClient();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.MY_PINATA_GATEWAY_URL,
});

export const getPets = async (request, response) => {
  const allPets = await prisma.pet.findMany();
  response.status(200).json(allPets);
};

export const getPet = async (request, response) => {
  const { id } = request.params;
  // By ID
  try {
    // const foundPet = await dbPrismaService.getBookById(Number(id))
    const foundPet = await prisma.pet.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    response.status(200).json(foundPet);
  } catch (error) {}
};

// POST endpoint
export const addPet = async (request, response) => {
  const files = request.files;
  const receivedPetData = request.body;

  const data = {
    name: receivedPetData.name,
    type: receivedPetData.type,
    breed: receivedPetData.breed,
    age: receivedPetData.age,
    sex: receivedPetData.sex,
    color: receivedPetData.color,
    size: receivedPetData.size,
    spayed_neutered: Boolean(receivedPetData.spayed_neutered),
    microchip_id: receivedPetData.microchip_id,
    description: receivedPetData.description,
    location: JSON.parse(receivedPetData.location),
    medical_disclaimer: JSON.parse(receivedPetData.medical_disclaimer),
    behavioral_disclaimer: JSON.parse(receivedPetData.behavioral_disclaimer),
    adoption_details: JSON.parse(receivedPetData.adoption_details),
    status: receivedPetData.status,
    needs_sponsorship: Boolean(receivedPetData.needs_sponsorship),
    images: receivedPetData.images,
  };

  // console.log("Received pet data:", data);
  console.log("Received pet data:");
  console.log(data);

  const imageUrls = [];

  console.log("File from route2:", files);
  if (Array.isArray(files)) {
    for (const file of files) {
      let url = await uploadFormData(file);
      imageUrls.push(url);
    }
  }

  data.images = imageUrls;

  await prisma.pet.create({
    data: data,
  });

  response.json({
    message: "Pet data received successfully and data from Neon!",
    data: data,
  });
};

const uploadFormData = async (ffile) => {
  try {
    const imageFile = fileDataToFileObject(
      ffile,
      ffile.originalname,
      ffile.mimetype
    );

    const uploadData = await pinata.upload.file(imageFile);
    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 3600000000000000,
    });

    console.log(`File uploaded successfully! CID: ${url}`);

    return url;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
  } finally {
  }
};

const fileDataToFileObject = (
  fileData,
  fileName,
  mimeType
) => {
  const bytes = fileData.buffer;
  const buffer = Buffer.from(bytes);
  const blob = new Blob([buffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};

function transformValue(key, value) {
  if (key === "size" && value === "~10kg") {
    return "Small"; // Modify "~10kg" size
  } else if (key === "size" && value === "10-20kg") {
    return "Medium"; // Modify "10-20kg" size
  } else if (key === "size" && value === "20kg~") {
    return "Large"; // Modify "20kg~" size
  }

  return value; // Return original value otherwise
}
