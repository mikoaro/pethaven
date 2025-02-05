import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const getOrders = async (request, response) => {
  const allOrders = await prisma.order.findMany();
  response.status(200).json(allOrders);
};

export const getOrder = async (request, response) => {
  const { id } = request.params;
  // By ID
  try {
    const foundOrder = await prisma.order.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    response.status(200).json(foundOrder);
  } catch (error) {}
};

// POST endpoint
export const addOrder = async (request, response) => {
  const receivedOrderData = request.body;

  const data = {
    username: receivedOrderData.username,
    firstname: receivedOrderData.firstname,
    lastname: receivedOrderData.lastname,
    status: receivedOrderData.status,
    microchip_id: receivedOrderData.microchip_id,
    amount: receivedOrderData.amount,
    donation_amount: receivedOrderData.donation_amount,
    total: receivedOrderData.total,
    total_d: receivedOrderData.total_d,
    pet_name: receivedOrderData.pet_name,
  };

  console.log("Received order data:");
  console.log(data);

  await prisma.order.create({
    data: data,
  });

  response.json({
    message: "Order data received successfully and data from Neon!",
    data: data,
  });
};
