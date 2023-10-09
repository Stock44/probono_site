/*
  Warnings:

  - Added the required column `isCustom` to the `OrganizationActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizationActivity" ADD COLUMN     "isCustom" BOOLEAN NOT NULL;
