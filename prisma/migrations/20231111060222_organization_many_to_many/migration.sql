/*
  Warnings:

  - You are about to drop the column `personId` on the `Organization` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_personId_fkey";

-- DropIndex
DROP INDEX "Organization_personId_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "personId";

-- CreateTable
CREATE TABLE "_OrganizationToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToPerson_AB_unique" ON "_OrganizationToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToPerson_B_index" ON "_OrganizationToPerson"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToPerson" ADD CONSTRAINT "_OrganizationToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToPerson" ADD CONSTRAINT "_OrganizationToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
