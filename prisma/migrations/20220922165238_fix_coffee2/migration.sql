/*
  Warnings:

  - You are about to drop the column `categoryId` on the `CoffeeShop` table. All the data in the column will be lost.
  - You are about to drop the column `coffeeShopPhotoId` on the `CoffeeShop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "categoryId",
DROP COLUMN "coffeeShopPhotoId";
