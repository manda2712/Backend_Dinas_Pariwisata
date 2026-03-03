const {
  insertDesa,
  findDesa,
  findDesaById,
  deleteFotoFile,
  editDesa,
  deleteDesa
} = require('./desaWisata.repository')

async function createDesa (dataDesa) {
  const newDesa = await insertDesa(dataDesa)
  return newDesa
}

async function getAllDesa () {
  const newDesa = await findDesa()
  return newDesa
}

async function getDesaId (id) {
  const desa = await findDesaById(id)
  if (!desa) {
    throw new Error('Desa Not Found')
  }
  return desa
}

async function removeDesaFoto (id) {
  const desa = await getDesaId(id)
  if (!desa.foto || desa.foto === '') {
    throw new Error('Tidak ada foto untuk dihapus pada desa ini')
  }
  return await deleteFotoFile(id)
}


async function editDesaById (id, desa) {
  await getDesaId(id)
  const updateDesa = await editDesa(id, desa)
  return updateDesa
}

async function deleteDesaById (id) {
  await getDesaId(id)
  await deleteDesa(id)
}

module.exports = {
  createDesa,
  getAllDesa,
  getDesaId,
  editDesaById,
  removeDesaFoto,
  deleteDesaById
}
