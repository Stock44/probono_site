/*
  Warnings:

  - Made the column `gender` on table `OrganizationAgeGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrganizationAgeGroup" ALTER COLUMN "gender" SET NOT NULL;
