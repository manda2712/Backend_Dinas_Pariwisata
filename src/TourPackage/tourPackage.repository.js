const prisma = require('../db')
const fs = require('fs') // Tambahkan ini
const path = require('path') // Tambahkan ini

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
      lokasi_en: tourPackage.lokasi_en,
      link_video: tourPackage.link_video
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
      lokasi_en: true,
      link_video: true
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
      ...(tourPackage.nama_wisata_id && {
        nama_wisata_id: tourPackage.nama_wisata_id
      }),
      ...(tourPackage.nama_wisata_en && {
        nama_wisata_en: tourPackage.nama_wisata_en
      }),
      ...(tourPackage.harga && { harga: tourPackage.harga }),
      ...(tourPackage.deskripsi_id && {
        deskripsi_id: tourPackage.deskripsi_id
      }),
      ...(tourPackage.deskripsi_en && {
        deskripsi_en: tourPackage.deskripsi_en
      }),
      ...(tourPackage.kontak && { kontak: tourPackage.kontak }),
      ...(tourPackage.media && { media: tourPackage.media }),
      ...(tourPackage.lokasi_id && { lokasi_id: tourPackage.lokasi_id }),
      ...(tourPackage.lokasi_en && { lokasi_en: tourPackage.lokasi_en }),
      ...(tourPackage.link_video !== undefined && {
        link_video: tourPackage.link_video
      })
    }
  })
  return updateTourPackage
}

async function deleteMedia (id) {
  const tourPackge = await prisma.tourPackage.findUnique({
    where: { id: parseInt(id) },
    select: { media: true }
  })

  if (tourPackge && tourPackge.media) {
    const fileName = tourPackge.media.replace('/uploads/', '')
    const filePath = path.join(__dirname, '../public/uploads', fileName)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  return await prisma.tourPackage.update({
    where: { id: parseInt(id) },
    data: {
      media: ''
    }
  })
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
  deleteMedia,
  deleteTourPackage
}
