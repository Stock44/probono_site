/*
  Warnings:

  - The primary key for the `OrganizationToOrganizationActivity` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OrganizationToOrganizationActivity" DROP CONSTRAINT "OrganizationToOrganizationActivity_pkey",
ADD CONSTRAINT "OrganizationToOrganizationActivity_pkey" PRIMARY KEY ("organizationId", "activityId", "priority");
