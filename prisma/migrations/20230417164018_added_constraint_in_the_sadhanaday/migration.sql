/*
  Warnings:

  - A unique constraint covering the columns `[sadhanaId,dayIndex]` on the table `SadhanaDay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SadhanaDay_sadhanaId_dayIndex_key" ON "SadhanaDay"("sadhanaId", "dayIndex");
