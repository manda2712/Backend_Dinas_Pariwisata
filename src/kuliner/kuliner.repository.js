const prisma = require('../db')
const fs = require('fs')
const path = require('path')

async function insertKuliner (kuliner) {
  const newKuliner = await prisma.kuliner.create({
    data: {
      nama_makanan: kuliner.nama_makanan,
      foto: kuliner.foto,
      deskripsi_id: kuliner.deskripsi_id,
      deskripsi_en: kuliner.deskripsi_en,
      lokasi: kuliner.lokasi,
      link_video: kuliner.link_video
    }
  })
  return newKuliner
}

async function findKuliner () {
  const kuliner = await prisma.kuliner.findMany({
    select: {
      id: true,
      nama_makanan: true,
      lokasi: true,
      foto: true,
      deskripsi_id: true,
      deskripsi_en: true,
      link_video: true
    }
  })
  return kuliner
}

async function findKulinerById (id) {
  const data = await prisma.kuliner.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return data
}

async function editKuliner (id, kuliner) {
  const updateKuliner = await prisma.kuliner.update({
    where: {
      id: parseInt(id)
    },
    data: {
      ...(kuliner.nama_makanan && { nama_makanan: kuliner.nama_makanan }),
      ...(kuliner.foto && { foto: kuliner.foto }),
      ...(kuliner.deskripsi_id && { deskripsi_id: kuliner.deskripsi_id }),
      ...(kuliner.deskripsi_en && { deskripsi_en: kuliner.deskripsi_en }),
      ...(kuliner.lokasi && { lokasi: kuliner.lokasi }),
      ...(kuliner.link_video !== undefined && {
        link_video: kuliner.link_video
      })
    }
  })
  return updateKuliner
}

async function deleteFotoKuliner (id) {
  const kuliner = await prisma.kuliner.findUnique({
    where: { id: parseInt(id) },
    select: { foto: true }
  })

  if (kuliner && kuliner.foto) {
    const fileName = kuliner.foto.replace('/uploads/', '')
    const filePath = path.join(__dirname, '../public/uploads', fileName)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  return await prisma.kuliner.update({
    where: { id: parseInt(id) },
    data: {
      foto: ''
    }
  })
}

async function deleteKulinerById (id) {
  await prisma.kuliner.delete({
    where: { id: parseInt(id) }
  })
}

async function deleteAllKuliner () {
  return await prisma.kuliner.deleteMany({})
}

module.exports = {
  insertKuliner,
  findKuliner,
  findKulinerById,
  editKuliner,
  deleteFotoKuliner,
  deleteAllKuliner,
  deleteKulinerById
}
