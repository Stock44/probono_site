/*
  Warnings:

  - The primary key for the `OrganizationToOrganizationActivity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[priority]` on the table `OrganizationToOrganizationActivity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OrganizationToOrganizationActivity" DROP CONSTRAINT "OrganizationToOrganizationActivity_pkey",
ADD CONSTRAINT "OrganizationToOrganizationActivity_pkey" PRIMARY KEY ("organizationId", "activityId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationToOrganizationActivity_priority_key" ON "OrganizationToOrganizationActivity"("priority");
