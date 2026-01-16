const prisma = require('../db')

async function insertTourPackage (tourPackage) {
  const newTourPackge = await prisma.tourPackage.create({
    data: {
      nama_wisata: tourPackage.nama_wisata,
      harga: tourPackage.harga,
      deskripsi: tourPackage.deskripsi,
      kontak: tourPackage.kontak,
      media: tourPackage.media,
      lokasi: tourPackage.lokasi
    }
  })
  return newTourPackge
}

async function findTourPacakage () {
  const tourPackage = await prisma.tourPackage.findMany({
    select: {
      id: true,
      nama_wisata: true,
      harga: true,
      deskripsi: true,
      kontak: true,
      media: true,
      lokasi: true
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
      nama_wisata: tourPackage.nama_wisata,
      harga: tourPackage.harga,
      deskripsi: tourPackage.deskripsi,
      kontak: tourPackage.kontak,
      media: tourPackage.media,
      lokasi: tourPackage.lokasi
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

async function deleteAllTourPackage () {
  try {
    await prisma.tourPackage.deleteMany()
    return {
      message: 'Semua Tour Package berhasil dihapus!'
    }
  } catch (error) {
    throw new Error('Gagal menghapus semua Tour Package: ' + error.message)
  }
}

module.exports = {
  insertTourPackage,
  findTourPacakage,
  findTourPacakageById,
  editTourPackage,
  deleteTourPackage,
  deleteAllTourPackage
}
