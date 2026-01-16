const hotelRepository = require('./hotel.repository')

async function createHotel (listHotel) {
  const newHotel = await hotelRepository.insertHotel(listHotel)
  return newHotel
}

async function getHotel () {
  const newHotel = await hotelRepository.findHotel()
  return newHotel
}

async function getHotelById (id) {
  const hotel = await hotelRepository.findHotelById(id)
  if (!hotel) {
    throw new Error('Hotel yang dicari tidak ditemukan')
  }
  return hotel
}

async function updateHotelById (id, hotel) {
  await getHotelById(id)
  const updateHotel = await hotelRepository.editHotel(id, hotel)
  return updateHotel
}

async function removeAllHotel () {
  await hotelRepository.deleteAllHotel({})
}

async function removeHotelById (id) {
  await getHotelById(id)
  await hotelRepository.deleteHotelById(id)
}

module.exports = {
  createHotel,
  getHotel,
  getHotelById,
  updateHotelById,
  removeAllHotel,
  removeHotelById
}
