/*
  Warnings:

  - You are about to drop the column `gender` on the `AgeGroup` table. All the data in the column will be lost.
  - You are about to drop the `_AgeGroupToOrganization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AgeGroupToOrganization" DROP CONSTRAINT "_AgeGroupToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_AgeGroupToOrganization" DROP CONSTRAINT "_AgeGroupToOrganization_B_fkey";

-- AlterTable
ALTER TABLE "AgeGroup" DROP COLUMN "gender";

-- DropTable
DROP TABLE "_AgeGroupToOrganization";

-- CreateTable
CREATE TABLE "OrganizationAgeGroup" (
    "organizationId" INTEGER NOT NULL,
    "ageGroupId" INTEGER NOT NULL,
    "gender" "Gender",

    CONSTRAINT "OrganizationAgeGroup_pkey" PRIMARY KEY ("organizationId","ageGroupId")
);

-- AddForeignKey
ALTER TABLE "OrganizationAgeGroup" ADD CONSTRAINT "OrganizationAgeGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAgeGroup" ADD CONSTRAINT "OrganizationAgeGroup_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
