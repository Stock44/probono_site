/*
  Warnings:

  - You are about to drop the `_OrganizationToPerson` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[personId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToPerson" DROP CONSTRAINT "_OrganizationToPerson_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToPerson" DROP CONSTRAINT "_OrganizationToPerson_B_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "personId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrganizationToPerson";

-- CreateIndex
CREATE UNIQUE INDEX "Organization_personId_key" ON "Organization"("personId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
