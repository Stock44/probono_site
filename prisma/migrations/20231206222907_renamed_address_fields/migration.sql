/*
  Warnings:

  - You are about to drop the column `extNumber` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `Address` table. All the data in the column will be lost.
  - Added the required column `number` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "extNumber",
DROP COLUMN "streetName",
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
