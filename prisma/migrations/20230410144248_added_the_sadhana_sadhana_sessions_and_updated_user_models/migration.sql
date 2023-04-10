-- CreateTable
CREATE TABLE "Sadhana" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "targetSessions" INTEGER NOT NULL,
    "targetSessionDuration" INTEGER NOT NULL,
    "periodicity" TEXT NOT NULL,
    "startingTimestamp" TIMESTAMP(3) NOT NULL,
    "elapsedDays" INTEGER NOT NULL,
    "started" BOOLEAN NOT NULL,
    "private" BOOLEAN NOT NULL,

    CONSTRAINT "Sadhana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SadhanaSession" (
    "id" TEXT NOT NULL,
    "sessionIndex" INTEGER NOT NULL,
    "startingTimestamp" TIMESTAMP(3) NOT NULL,
    "finishedTimestamp" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "sadhanaId" INTEGER NOT NULL,
    "notes" TEXT,
    "feeling" INTEGER NOT NULL,

    CONSTRAINT "SadhanaSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "main" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SadhanaParticipants" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SadhanaParticipants_AB_unique" ON "_SadhanaParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_SadhanaParticipants_B_index" ON "_SadhanaParticipants"("B");

-- AddForeignKey
ALTER TABLE "Sadhana" ADD CONSTRAINT "Sadhana_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaSession" ADD CONSTRAINT "SadhanaSession_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SadhanaSession" ADD CONSTRAINT "SadhanaSession_sadhanaId_fkey" FOREIGN KEY ("sadhanaId") REFERENCES "Sadhana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SadhanaParticipants" ADD CONSTRAINT "_SadhanaParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Sadhana"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SadhanaParticipants" ADD CONSTRAINT "_SadhanaParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
