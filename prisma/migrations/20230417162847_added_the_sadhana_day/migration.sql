/*
  Warnings:

  - Added the required column `sadhanaDayId` to the `SadhanaSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sadhana" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "SadhanaSession" ADD COLUMN     "sadhanaDayId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SadhanaDay" (
    "id" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    "sadhanaId" INTEGER NOT NULL,

    CONSTRAINT "SadhanaDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SadhanaDay" ADD CONSTRAINT "SadhanaDay_sadhanaId_fkey" FOREIGN KEY ("sadhanaId") REFERENCES "Sadhana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaSession" ADD CONSTRAINT "SadhanaSession_sadhanaDayId_fkey" FOREIGN KEY ("sadhanaDayId") REFERENCES "SadhanaDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
