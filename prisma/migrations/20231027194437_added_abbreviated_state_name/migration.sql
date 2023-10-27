/*
  Warnings:

  - Added the required column `abbreviatedName` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" ADD COLUMN     "abbreviatedName" TEXT NOT NULL;
