/*
  Warnings:

  - Made the column `isIncorporated` on table `Organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "isIncorporated" SET NOT NULL;
