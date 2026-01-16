const prisma = require('../db')

async function insertDesa (desaWisata) {
  const newDesa = await prisma.desaWisata.create({
    data: {
      namaDesa_id: desaWisata.namaDesa_id,
      namaDesa_en: desaWisata.namaDesa_en,
      lokasi_id: desaWisata.lokasi_id,
      lokasi_en: desaWisata.lokasi_en,
      deskripsi_id: desaWisata.deskripsi_id,
      deskripsi_en: desaWisata.deskripsi_en, //1
      foto: desaWisata.foto,
      longitude: desaWisata.longitude,
      latitude: desaWisata.latitude,
      jenisDesa: desaWisata.jenisDesa
    }
  })
  return newDesa
}

async function findDesa () {
  const desa = await prisma.desaWisata.findMany({
    select: {
      id: true,
      namaDesa_id: true,
      namaDesa_en: true,
      lokasi_id: true,
      lokasi_en: true,
      deskripsi_id: true,
      deskripsi_en: true, //2
      foto: true,
      longitude: true,
      latitude: true,
      jenisDesa: true
    }
  })
  return desa
}

async function findDesaById (id) {
  const desa = await prisma.desaWisata.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return desa
}

async function editDesa (id, desaWisata) {
  const updateDesa = await prisma.desaWisata.update({
    where: {
      id: parseInt(id)
    },
    data: {
      // Gunakan pengecekan agar hanya kolom yang dikirim saja yang diupdate
      ...(desaWisata.namaDesa_id && { namaDesa_id: desaWisata.namaDesa_id }),
      ...(desaWisata.namaDesa_en && { namaDesa_en: desaWisata.namaDesa_en }),
      ...(desaWisata.lokasi_id && { lokasi_id: desaWisata.lokasi_id }),
      ...(desaWisata.lokasi_en && { lokasi_en: desaWisata.lokasi_en }),
      ...(desaWisata.deskripsi_id && { deskripsi_id: desaWisata.deskripsi_id }),
      ...(desaWisata.deskripsi_en && { deskripsi_en: desaWisata.deskripsi_en }), //3
      longitude: desaWisata.longitude,
      latitude: desaWisata.latitude,
      jenisDesa: desaWisata.jenisDesa
    }
  })
  return updateDesa
}

async function deleteDesa (id) {
  await prisma.desaWisata.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  insertDesa,
  findDesa,
  findDesaById,
  editDesa,
  deleteDesa
}
