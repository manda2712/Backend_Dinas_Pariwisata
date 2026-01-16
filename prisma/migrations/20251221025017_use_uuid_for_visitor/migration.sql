-- DropForeignKey
ALTER TABLE "public"."pageView" DROP CONSTRAINT "pageView_visitorId_fkey";

-- AlterTable
ALTER TABLE "public"."pageView" ALTER COLUMN "visitorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."pageView" ADD CONSTRAINT "pageView_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "public"."Visitor"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
