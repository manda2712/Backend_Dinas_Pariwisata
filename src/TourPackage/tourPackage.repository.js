const prisma = require('../db')

async function insertTourPackage (tourPackage) {
  const newTourPackge = await prisma.tourPackage.create({
    data: {
      nama_wisata_id: tourPackage.nama_wisata_id,
      nama_wisata_en: tourPackage.nama_wisata_en,
      harga: tourPackage.harga,
      deskripsi_id: tourPackage.deskripsi_id,
      deskripsi_en: tourPackage.deskripsi_en,
      kontak: tourPackage.kontak,
      media: tourPackage.media,
      lokasi_id: tourPackage.lokasi_id,
      lokasi_en: tourPackage.lokasi_en
    }
  })
  return newTourPackge
}

async function findTourPacakage () {
  const tourPackage = await prisma.tourPackage.findMany({
    select: {
      id: true,
      nama_wisata_id: true,
      nama_wisata_en: true,
      harga: true,
      deskripsi_id: true,
      deskripsi_en: true,
      kontak: true,
      media: true,
      lokasi_id: true,
      lokasi_en: true
    }
  })
  return tourPackage
}

async function findTourPacakageById (id) {
  const tourPackage = await prisma.tourPackage.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return tourPackage
}

async function editTourPackage (id, tourPackage) {
  const updateTourPackage = await prisma.tourPackage.update({
    where: {
      id: parseInt(id)
    },
    data: {
      ...(tourPackage.nama_wisata_id && {nama_wisata_id: tourPackage.nama_wisata_id}),
      ...(tourPackage.nama_wisata_en && {nama_wisata_en: tourPackage.nama_wisata_en}),
      ...(tourPackage.harga && {harga: tourPackage.harga}),
      ...(tourPackage.deskripsi_id && {deskripsi_id: tourPackage.deskripsi_id}),
      ...(tourPackage.deskripsi_en && {deskripsi_en: tourPackage.deskripsi_en}),
      ...(tourPackage.kontak && {kontak: tourPackage.kontak}),
      ...(tourPackage.media && {media: tourPackage.media}),
      ...(tourPackage.lokasi_id && { lokasi_id: tourPackage.lokasi_id }),
      ...(tourPackage.lokasi_en && { lokasi_en: tourPackage.lokasi_en })
    }
  })
  return updateTourPackage
}

async function deleteTourPackage (id) {
  await prisma.tourPackage.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  insertTourPackage,
  findTourPacakage,
  findTourPacakageById,
  editTourPackage,
  deleteTourPackage,
}
