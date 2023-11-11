/*
  Warnings:

  - You are about to drop the column `email` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "email",
ADD COLUMN     "contactEmail" TEXT;
