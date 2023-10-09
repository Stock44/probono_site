/*
  Warnings:

  - You are about to drop the column `isCustom` on the `OrganizationActivity` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `OrganizationActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizationActivity" DROP COLUMN "isCustom",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "OrganizationActivityCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OrganizationActivityCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrganizationActivity" ADD CONSTRAINT "OrganizationActivity_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "OrganizationActivityCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
