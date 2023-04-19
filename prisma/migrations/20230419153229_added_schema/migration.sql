-- AlterTable
ALTER TABLE "Sadhana" ADD COLUMN     "activeDay" INTEGER;

-- CreateTable
CREATE TABLE "SadhanaUpdate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "sadhanaId" INTEGER NOT NULL,
    "dayIndex" INTEGER NOT NULL,

    CONSTRAINT "SadhanaUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SadhanaUpdate_sadhanaId_dayIndex_key" ON "SadhanaUpdate"("sadhanaId", "dayIndex");

-- AddForeignKey
ALTER TABLE "SadhanaUpdate" ADD CONSTRAINT "SadhanaUpdate_sadhanaId_fkey" FOREIGN KEY ("sadhanaId") REFERENCES "Sadhana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
