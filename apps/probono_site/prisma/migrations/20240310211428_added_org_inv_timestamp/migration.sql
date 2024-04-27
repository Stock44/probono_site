/*
  Warnings:

  - You are about to drop the column `email` on the `OrganizationInvitation` table. All the data in the column will be lost.
  - Added the required column `recipient` to the `OrganizationInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizationInvitation" DROP COLUMN "email",
ADD COLUMN     "recipient" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
