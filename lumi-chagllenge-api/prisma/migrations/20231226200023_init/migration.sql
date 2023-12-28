/*
  Warnings:

  - The `referenceMonth` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "referenceYear" INTEGER,
DROP COLUMN "referenceMonth",
ADD COLUMN     "referenceMonth" INTEGER;
