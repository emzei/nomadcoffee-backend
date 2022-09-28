/*
  Warnings:

  - You are about to drop the column `longtitude` on the `CoffeeShop` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "longtitude",
ADD COLUMN     "longitude" TEXT NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE TEXT;
