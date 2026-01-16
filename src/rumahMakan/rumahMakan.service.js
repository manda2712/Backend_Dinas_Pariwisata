const rumahMakanRepository = require('./rumahMakan.repository')

async function createRumahMakan (dataRumahMakan) {
  const newRumahMakan = await rumahMakanRepository.insertRumahMakan(
    dataRumahMakan
  )
  return newRumahMakan
}

async function getAllRumahMakan () {
  const newRumahMakan = await rumahMakanRepository.findRumahMakan()
  return newRumahMakan
}

async function getRumahMakanByid (id) {
  const rumahMakan = await rumahMakanRepository.findRumahMakanByid(id)
  if (!rumahMakan) {
    throw new Error('Rumah Makan Tidak Ditemukan')
  }
  return rumahMakan
}

async function updateRumahMakanById (id, rumahMakan) {
  await getRumahMakanByid(id)
  const updateRumahMakan = await rumahMakanRepository.editRumahMakan(
    id,
    rumahMakan
  )
  return updateRumahMakan
}

async function removeAllRumahMakan () {
  await rumahMakanRepository.deleteAllRumahMakan({})
}

async function removeRumahMakanById (id) {
  await getRumahMakanByid(id)
  await rumahMakanRepository.deleteRumahMakan(id)
}

module.exports = {
  createRumahMakan,
  getAllRumahMakan,
  getRumahMakanByid,
  updateRumahMakanById,
  removeAllRumahMakan,
  removeRumahMakanById
}
