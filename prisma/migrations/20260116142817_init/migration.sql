-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'user');

-- CreateEnum
CREATE TYPE "Kota" AS ENUM ('PALU', 'LUWUK');

-- CreateEnum
CREATE TYPE "JenisDesa" AS ENUM ('DESA_UNGGULAN', 'DESA_WISATA');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nama_Lengkap" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourPackage" (
    "id" SERIAL NOT NULL,
    "nama_wisata_id" TEXT NOT NULL,
    "nama_wisata_en" TEXT NOT NULL,
    "harga" TEXT NOT NULL,
    "deskripsi_id" TEXT NOT NULL,
    "deskripsi_en" TEXT NOT NULL,
    "kontak" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "lokasi_id" TEXT NOT NULL,
    "lokasi_en" TEXT NOT NULL,

    CONSTRAINT "TourPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ulasan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "komentar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ulasan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "nameEvent" TEXT NOT NULL,
    "description_id" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "location_en" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "startdate" TIMESTAMP(3) NOT NULL,
    "enddate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desaWisata" (
    "id" SERIAL NOT NULL,
    "namaDesa_id" TEXT NOT NULL,
    "namaDesa_en" TEXT NOT NULL,
    "deskripsi_id" TEXT NOT NULL,
    "deskripsi_en" TEXT NOT NULL,
    "lokasi_id" TEXT NOT NULL,
    "lokasi_en" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "jenisDesa" "JenisDesa" NOT NULL,

    CONSTRAINT "desaWisata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jarakDesa" (
    "id" SERIAL NOT NULL,
    "desaId" INTEGER NOT NULL,
    "titikKota" "Kota" NOT NULL,
    "jalur_laut" TEXT NOT NULL,
    "jalur_darat" TEXT NOT NULL,
    "jalur_udara" TEXT NOT NULL,

    CONSTRAINT "jarakDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kuliner" (
    "id" SERIAL NOT NULL,
    "nama_makanan" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "deskripsi_id" TEXT NOT NULL,
    "deskripsi_en" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,

    CONSTRAINT "Kuliner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RumahMakan" (
    "id" SERIAL NOT NULL,
    "resto" TEXT NOT NULL,
    "kulinerId" INTEGER NOT NULL,
    "link_gmaps" TEXT NOT NULL,

    CONSTRAINT "RumahMakan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "nama_hotel" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "jumlah_kamar" TEXT NOT NULL,
    "jumlah_tempatTidur" TEXT NOT NULL,
    "harga" TEXT,
    "website" TEXT,
    "link_gmaps" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pageView" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_uid_key" ON "Visitor"("uid");

-- AddForeignKey
ALTER TABLE "jarakDesa" ADD CONSTRAINT "jarakDesa_desaId_fkey" FOREIGN KEY ("desaId") REFERENCES "desaWisata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RumahMakan" ADD CONSTRAINT "RumahMakan_kulinerId_fkey" FOREIGN KEY ("kulinerId") REFERENCES "Kuliner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pageView" ADD CONSTRAINT "pageView_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
