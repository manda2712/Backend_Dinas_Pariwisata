const kulinerRepository = require('./kuliner.repository')

async function createKuliner (listKuliner) {
  const newKuliner = await kulinerRepository.insertKuliner(listKuliner)
  return newKuliner
}

async function getAllKuliner () {
  const newKuliner = await kulinerRepository.findKuliner()
  return newKuliner
}

async function getKulinerById (id) {
  const kuliner = await kulinerRepository.findKulinerById(id)
  if (!kuliner) {
    throw new Error('Kuliner yang dicari tidak ditemukan')
  }
  return kuliner
}

async function updateKuliner (id, kuliner) {
  await getKulinerById(id)
  const updateKuliner = await kulinerRepository.editKuliner(id, kuliner)
  return updateKuliner
}

async function removeKulinerFoto (id) {
  const kuliner = await getKulinerById(id)
  if (!kuliner.foto || kuliner.foto === '') {
    throw new Error('Tidak ada foto untuk dihapus pada kuliner ini')
  }
  return await kulinerRepository.deleteFotoKuliner(id)
}

async function removeAllKuliner () {
  await kulinerRepository.deleteAllKuliner({})
}

async function removeKulinerById (id) {
  await getKulinerById(id)
  await kulinerRepository.deleteKulinerById(id)
}

module.exports = {
  createKuliner,
  getAllKuliner,
  getKulinerById,
  updateKuliner,
  removeKulinerFoto,
  removeAllKuliner,
  removeKulinerById
}
