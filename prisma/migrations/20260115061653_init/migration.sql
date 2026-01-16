/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsi` on the `Kuliner` table. All the data in the column will be lost.
  - You are about to drop the column `lokasi` on the `Kuliner` table. All the data in the column will be lost.
  - Added the required column `description_en` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_en` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deskripsi_en` to the `Kuliner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deskripsi_id` to the `Kuliner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_en` to the `Kuliner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `Kuliner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "location",
ADD COLUMN     "description_en" TEXT NOT NULL,
ADD COLUMN     "description_id" TEXT NOT NULL,
ADD COLUMN     "location_en" TEXT NOT NULL,
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Kuliner" DROP COLUMN "deskripsi",
DROP COLUMN "lokasi",
ADD COLUMN     "deskripsi_en" TEXT NOT NULL,
ADD COLUMN     "deskripsi_id" TEXT NOT NULL,
ADD COLUMN     "lokasi_en" TEXT NOT NULL,
ADD COLUMN     "lokasi_id" TEXT NOT NULL;
