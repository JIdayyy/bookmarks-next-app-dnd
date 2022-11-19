/*
  Warnings:

  - Made the column `position` on table `BookMark` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BookMark" ALTER COLUMN "position" SET NOT NULL;
