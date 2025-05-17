/*
  Warnings:

  - Made the column `street` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `healthNotes` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "healthNotes" SET NOT NULL;
