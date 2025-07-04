/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Webniar` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Webniar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Webniar" DROP CONSTRAINT "Webniar_categoryId_fkey";

-- AlterTable
ALTER TABLE "Webniar" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";
