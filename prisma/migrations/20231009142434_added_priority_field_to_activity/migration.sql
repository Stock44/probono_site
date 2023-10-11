/*
  Warnings:

  - You are about to drop the `_OrganizationToOrganizationActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToOrganizationActivity" DROP CONSTRAINT "_OrganizationToOrganizationActivity_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToOrganizationActivity" DROP CONSTRAINT "_OrganizationToOrganizationActivity_B_fkey";

-- DropTable
DROP TABLE "_OrganizationToOrganizationActivity";

-- CreateTable
CREATE TABLE "OrganizationToOrganizationActivity" (
    "organizationId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "OrganizationToOrganizationActivity_pkey" PRIMARY KEY ("organizationId","activityId")
);

-- AddForeignKey
ALTER TABLE "OrganizationToOrganizationActivity" ADD CONSTRAINT "OrganizationToOrganizationActivity_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationToOrganizationActivity" ADD CONSTRAINT "OrganizationToOrganizationActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "OrganizationActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
