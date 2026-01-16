const {
  insertUlasan,
  finndUlasan,
  findUlasanById,
  editUlasan,
  deleteUlasan
} = require('./ulasan.repository')

async function createUlasan (dataUlasan) {
  if (dataUlasan.rating < 1 || dataUlasan.rating > 5) {
    throw new Error('Rating harus antara 1 sampai 5 bintang')
  }
  return await insertUlasan(dataUlasan)
}

async function getAllUlasan () {
  return await finndUlasan()
}

async function getUlasanById (id) {
  const ulasan = await findUlasanById(id)
  if (!ulasan) throw new Error('Ulasan tidak ditemukan')
  return ulasan
}

async function editUlasanById (id, dataUlasan) {
  await getUlasanById(id)
  if (dataUlasan.rating < 1 || dataUlasan.rating > 5) {
    throw new Error('Rating harus antara 1 sampai 5 bintang')
  }
  return await editUlasan(id, dataUlasan)
}

async function deleteUlasanById (id) {
  await getUlasanById(id)
  return await deleteUlasan(id)
}

module.exports = {
  createUlasan,
  getAllUlasan,
  getUlasanById,
  editUlasanById,
  deleteUlasanById
}
