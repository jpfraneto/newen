/*
  Warnings:

  - You are about to drop the column `description` on the `Sadhana` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `Sadhana` table. All the data in the column will be lost.
  - Added the required column `isPrivate` to the `Sadhana` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLimit` to the `Sadhana` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startingTimestamp` on the `Sadhana` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Sadhana" DROP COLUMN "description",
DROP COLUMN "private",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL,
ADD COLUMN     "userLimit" INTEGER NOT NULL,
DROP COLUMN "startingTimestamp",
ADD COLUMN     "startingTimestamp" INTEGER NOT NULL,
ALTER COLUMN "elapsedDays" SET DEFAULT 0,
ALTER COLUMN "started" SET DEFAULT false;
