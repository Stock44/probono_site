/*
  Warnings:

  - You are about to drop the column `hasInvestmendAgreement` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "hasInvestmendAgreement",
ADD COLUMN     "hasInvestmentAgreement" BOOLEAN;
