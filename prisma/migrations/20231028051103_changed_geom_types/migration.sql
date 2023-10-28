/*
  Warnings:

  - You are about to drop the column `limits` on the `Sector` table. All the data in the column will be lost.
  - Added the required column `geom` to the `Sector` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_municipalityId_fkey";

-- AlterTable
ALTER TABLE "Sector" DROP COLUMN "limits",
ADD COLUMN     "geom" geometry NOT NULL,
ALTER COLUMN "municipalityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE SET NULL ON UPDATE CASCADE;
