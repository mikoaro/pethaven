import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const getContacts = async (request, response) => {
  const allContacts = await prisma.contact.findMany();
  response.status(200).json(allContacts);
};

export const getContact = async (request, response) => {
  const { id } = request.params;
  // By ID
  try {
    const foundContact = await prisma.contact.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    response.status(200).json(foundContact);
  } catch (error) {}
};

// POST endpoint
export const addContact = async (request, response) => {
  const receivedContactData = request.body;

  const data = {
    username: receivedContactData.username,
    firstname: receivedContactData.firstname,
    lastname: receivedContactData.lastname,
    status: receivedContactData.status,
    email: receivedContactData.email,
    phone: receivedContactData.phone,
    donation_amount: receivedContactData.donation_amount,
    total: receivedContactData.total,
    total_d: receivedContactData.total_d,
    pet_name: receivedContactData.pet_name,
  };

  console.log("Received contact data:");
  console.log(data);

  await prisma.contact.create({
    data: data,
  });

  response.json({
    message: "Contact data received successfully and data from Neon!",
    data: data,
  });
};
