/*
  Warnings:

  - You are about to drop the column `harga` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "harga",
ADD COLUMN     "harga_maximum" TEXT,
ADD COLUMN     "harga_minimum" TEXT;
