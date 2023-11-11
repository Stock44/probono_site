/*
  Warnings:

  - The primary key for the `VolunteerCountCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `VolunteerCountCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_volunteerCountCategoryId_fkey";

-- AlterTable
ALTER TABLE "VolunteerCountCategory" DROP CONSTRAINT "VolunteerCountCategory_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "VolunteerCountCategory_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_volunteerCountCategoryId_fkey" FOREIGN KEY ("volunteerCountCategoryId") REFERENCES "VolunteerCountCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
