/*
  Warnings:

  - The primary key for the `Visitor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Visitor" DROP CONSTRAINT "Visitor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Visitor_id_seq";
