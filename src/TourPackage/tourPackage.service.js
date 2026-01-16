const { tourPackage } = require('../db')
const {
  insertTourPackage,
  findTourPacakage,
  findTourPacakageById,
  editTourPackage,
  deleteTourPackage,
  deleteAllTourPackage
} = require('./tourPackage.repository')

async function createTourPackage (pacakgeData) {
  const newTourPackge = await insertTourPackage(pacakgeData)
  return newTourPackge
}

async function getAllTourPackage () {
  const tourPackage = await findTourPacakage()
  return tourPackage
}

async function getTourPackageById (id) {
  const tourPackage = await findTourPacakageById(id)
  if (!tourPackage) {
    throw new Error('Tour Package Not Found')
  }
  return tourPackage
}

async function editTourPackageById (id, tourPackage) {
  await getTourPackageById(id)
  const updateTourPackage = await editTourPackage(id, tourPackage)
  return updateTourPackage
}

async function deleteTourPackageById (id) {
  await getTourPackageById(id)
  await deleteTourPackage(id)
}

async function deleteAllTourPackageService () {
  const deleted = await deleteAllTourPackage()
  return deleted
}

module.exports = {
  createTourPackage,
  getAllTourPackage,
  getTourPackageById,
  editTourPackageById,
  deleteTourPackageById,
  deleteAllTourPackageService
}
