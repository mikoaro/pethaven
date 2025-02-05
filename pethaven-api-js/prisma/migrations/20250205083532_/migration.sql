-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "microchip_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "donation_amount" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "total_d" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_name" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
