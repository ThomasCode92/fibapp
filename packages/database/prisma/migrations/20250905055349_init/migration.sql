-- CreateTable
CREATE TABLE "public"."Fibonacci" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fibonacci_pkey" PRIMARY KEY ("id")
);
