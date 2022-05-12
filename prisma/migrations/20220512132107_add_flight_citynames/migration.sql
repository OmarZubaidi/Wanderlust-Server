/*
  Warnings:

  - Added the required column `arrivalCity` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureCity` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "arrivalCity" TEXT NOT NULL,
ADD COLUMN     "departureCity" TEXT NOT NULL;
