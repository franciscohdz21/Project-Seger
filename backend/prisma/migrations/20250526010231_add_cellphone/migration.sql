/*
  Warnings:

  - You are about to drop the column `firstName` on the `Cabin1Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Cabin1Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `sessionNumber` on the `Cabin1Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Cabin2Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Cabin2Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `sessionNumber` on the `Cabin2Appointment` table. All the data in the column will be lost.
  - Added the required column `cellPhone` to the `Cabin1Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Cabin1Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `Cabin1Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellPhone` to the `Cabin2Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Cabin2Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `Cabin2Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cabin1Appointment" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "sessionNumber",
ADD COLUMN     "cellPhone" INTEGER NOT NULL,
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "session" INTEGER NOT NULL,
ALTER COLUMN "package" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Cabin2Appointment" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "sessionNumber",
ADD COLUMN     "cellPhone" INTEGER NOT NULL,
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "session" INTEGER NOT NULL,
ALTER COLUMN "package" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "totalPaid" DOUBLE PRECISION NOT NULL,
    "totalLeft" DOUBLE PRECISION NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
