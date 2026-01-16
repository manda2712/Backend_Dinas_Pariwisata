const jarakDesaRpository = require('./jarakDesa.repository')

async function createJarakDesa (dataJarakDesa) {
  const newJarakDesa = await jarakDesaRpository.insertJarak(dataJarakDesa)
  return newJarakDesa
}

async function getAllJarakDesa () {
  const newJarakDesa = await jarakDesaRpository.findJarak()
  return newJarakDesa
}

async function getJarakDesaById (id) {
  const jarakDesa = await jarakDesaRpository.findJarakById(id)
  if (!jarakDesa) {
    throw new Error('Jarak desa tidak dapat ditemukan')
  }
  return jarakDesa
}

async function udpateJarakDesa (id, jarakDesa) {
  await getJarakDesaById(id)
  const udpateJarakDesa = await jarakDesaRpository.editJarakDesa(id, jarakDesa)
  return udpateJarakDesa
}

async function removeAllJarakDesa () {
  await jarakDesaRpository.deleteAllJarakDesa({})
}

async function removeJarakDesaById (id) {
  await getJarakDesaById(id)
  await jarakDesaRpository.deleteJarakDesaById(id)
}

module.exports = {
  createJarakDesa,
  getAllJarakDesa,
  getJarakDesaById,
  udpateJarakDesa,
  removeAllJarakDesa,
  removeJarakDesaById
}
