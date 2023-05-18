-- CreateTable
CREATE TABLE "ConcursoChallenge" (
    "id" SERIAL NOT NULL,
    "challenge" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcursoChallenge_pkey" PRIMARY KEY ("id")
);
