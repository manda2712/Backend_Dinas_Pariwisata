const prisma = require('../db')

async function insertUlasan (ulasan) {
  const newUlasan = await prisma.ulasan.create({
    data: {
      nama: ulasan.nama,
      rating: ulasan.rating,
      komentar: ulasan.komentar
    }
  })
  return newUlasan
}

async function finndUlasan () {
  const ulasan = await prisma.ulasan.findMany({
    select: {
      id: true,
      nama: true,
      rating: true,
      komentar: true,
      createdAt: true
    }
  })
  return ulasan
}

async function findUlasanById (id) {
  const ulasan = await prisma.ulasan.findUnique({
    where: {
      id: parseInt(id)
    },
    select: {
      id: true,
      nama: true,
      rating: true,
      komentar: true,
      createdAt: true
    }
  })
  return ulasan
}

async function editUlasan (id, ulasan) {
  const updateUlasan = await prisma.ulasan.update({
    where: {
      id: parseInt(id)
    },
    data: {
      nama: ulasan.nama,
      rating: ulasan.rating,
      komentar: ulasan.komentar
    }
  })
  return updateUlasan
}

async function deleteUlasan (id) {
  await prisma.ulasan.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  insertUlasan,
  finndUlasan,
  findUlasanById,
  editUlasan,
  deleteUlasan
}
