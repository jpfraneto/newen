/*
  Warnings:

  - Added the required column `completedAt` to the `SadhanaSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SadhanaSession" ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "sessionIndex" DROP NOT NULL,
ALTER COLUMN "startingTimestamp" DROP NOT NULL,
ALTER COLUMN "finishedTimestamp" DROP NOT NULL,
ALTER COLUMN "feeling" DROP NOT NULL;
