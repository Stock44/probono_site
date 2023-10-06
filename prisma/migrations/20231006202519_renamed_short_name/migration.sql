/*
  Warnings:

  - You are about to drop the column `short_name` on the `CorporationType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CorporationType" DROP COLUMN "short_name",
ADD COLUMN     "shortName" TEXT;
