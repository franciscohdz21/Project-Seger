/*
  Warnings:

  - You are about to drop the column `customerId` on the `Cabin1Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `Cabin1Appointment` table. All the data in the column will be lost.
  - You are about to alter the column `package` on the `Cabin1Appointment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `customerId` on the `Cabin2Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `Cabin2Appointment` table. All the data in the column will be lost.
  - You are about to alter the column `package` on the `Cabin2Appointment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `Cabin1Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Cabin1Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionNumber` to the `Cabin1Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Cabin2Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Cabin2Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionNumber` to the `Cabin2Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cabin1Appointment" DROP COLUMN "customerId",
DROP COLUMN "session",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "sessionNumber" INTEGER NOT NULL,
ALTER COLUMN "package" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Cabin2Appointment" DROP COLUMN "customerId",
DROP COLUMN "session",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "sessionNumber" INTEGER NOT NULL,
ALTER COLUMN "package" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "Payment";
