/*
  Warnings:

  - You are about to drop the `_OrganizationToPerson` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizationId` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToPerson" DROP CONSTRAINT "_OrganizationToPerson_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToPerson" DROP CONSTRAINT "_OrganizationToPerson_B_fkey";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrganizationToPerson";

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
