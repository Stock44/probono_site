/*
  Warnings:

  - Made the column `municipalityId` on table `Sector` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_municipalityId_fkey";

-- AlterTable
ALTER TABLE "Sector" ALTER COLUMN "municipalityId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
