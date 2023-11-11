/*
  Warnings:

  - You are about to drop the column `intNumber` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "intNumber",
DROP COLUMN "neighborhood";
