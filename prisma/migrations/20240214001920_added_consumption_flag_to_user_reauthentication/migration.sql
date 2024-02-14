/*
  Warnings:

  - Added the required column `consumed` to the `UserReauthentication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserReauthentication" ADD COLUMN     "consumed" BOOLEAN NOT NULL;
