/*
  Warnings:

  - Added the required column `stateId` to the `Municipality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "stateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
