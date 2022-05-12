/*
  Warnings:

  - You are about to drop the column `arrAirport` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `arrival` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `depAirport` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `departure` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `gate` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `itineraries` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "arrAirport",
DROP COLUMN "arrival",
DROP COLUMN "depAirport",
DROP COLUMN "departure",
DROP COLUMN "gate",
ADD COLUMN     "itineraries" TEXT NOT NULL;
