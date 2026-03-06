/*
  Warnings:

  - The `status` column on the `leads` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "pageUrl" TEXT,
ADD COLUMN     "referrerUrl" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'new';

-- DropEnum
DROP TYPE "Status";
