/*
  Warnings:

  - You are about to drop the column `lokasi_en` on the `Kuliner` table. All the data in the column will be lost.
  - You are about to drop the column `lokasi_id` on the `Kuliner` table. All the data in the column will be lost.
  - Added the required column `lokasi` to the `Kuliner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kuliner" DROP COLUMN "lokasi_en",
DROP COLUMN "lokasi_id",
ADD COLUMN     "lokasi" TEXT NOT NULL;
