-- DropForeignKey
ALTER TABLE "public"."RumahMakan" DROP CONSTRAINT "RumahMakan_kulinerId_fkey";

-- CreateTable
CREATE TABLE "public"."Visitor" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pageView" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_uid_key" ON "public"."Visitor"("uid");

-- AddForeignKey
ALTER TABLE "public"."RumahMakan" ADD CONSTRAINT "RumahMakan_kulinerId_fkey" FOREIGN KEY ("kulinerId") REFERENCES "public"."Kuliner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pageView" ADD CONSTRAINT "pageView_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "public"."Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
