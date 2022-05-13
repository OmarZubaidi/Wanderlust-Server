/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `description` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "coordinates",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "rating" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
