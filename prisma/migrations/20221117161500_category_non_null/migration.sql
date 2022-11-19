/*
  Warnings:

  - Made the column `categoryId` on table `BookMark` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookMark" DROP CONSTRAINT "BookMark_categoryId_fkey";

-- AlterTable
ALTER TABLE "BookMark" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
