/*
  Warnings:

  - Made the column `feeling` on table `SadhanaSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SadhanaSession" ALTER COLUMN "feeling" SET NOT NULL;
