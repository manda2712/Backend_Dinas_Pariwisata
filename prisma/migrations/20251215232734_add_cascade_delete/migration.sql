-- DropForeignKey
ALTER TABLE "jarakDesa" DROP CONSTRAINT "jarakDesa_desaId_fkey";

-- AddForeignKey
ALTER TABLE "jarakDesa" ADD CONSTRAINT "jarakDesa_desaId_fkey" FOREIGN KEY ("desaId") REFERENCES "desaWisata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
