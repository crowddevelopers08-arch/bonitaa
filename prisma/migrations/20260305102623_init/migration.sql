/*
  Warnings:

  - You are about to drop the `Leads` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('new', 'contacted', 'scheduled', 'converted', 'lost');

-- DropTable
DROP TABLE "Leads";

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "treatment" TEXT,
    "procedure" TEXT,
    "message" TEXT,
    "city" TEXT,
    "age" TEXT,
    "pincode" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "formName" TEXT,
    "status" "Status" NOT NULL DEFAULT 'new',
    "telecrmSynced" BOOLEAN NOT NULL DEFAULT false,
    "telecrmId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
