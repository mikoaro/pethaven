-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('Dog', 'Cat', 'Others');

-- CreateEnum
CREATE TYPE "PetSex" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PetType" NOT NULL,
    "breed" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "sex" "PetSex" NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "spayed_neutered" BOOLEAN NOT NULL,
    "microchip_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "medical_disclaimer" JSONB NOT NULL,
    "behavioral_disclaimer" JSONB NOT NULL,
    "adoption_details" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "needs_sponsorship" BOOLEAN NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);
