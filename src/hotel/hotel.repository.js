const prisma = require('../db')

async function insertHotel (hotel) {
  const newHotel = await prisma.hotel.create({
    data: {
      nama_hotel: hotel.nama_hotel,
      foto: hotel.foto,
      telepon: hotel.telepon,
      alamat: hotel.alamat,
      deskripsi: hotel.deskripsi,
      jumlah_kamar: hotel.jumlah_kamar,
      jumlah_tempatTidur: hotel.jumlah_tempatTidur,
      harga: hotel.harga,
      website: hotel.website,
      link_gmaps: hotel.link_gmaps,
      lokasi: hotel.lokasi
    }
  })
  return newHotel
}

async function findHotel () {
  const dataHotel = await prisma.hotel.findMany({
    select: {
      id: true,
      nama_hotel: true,
      foto: true,
      telepon: true,
      jumlah_kamar: true,
      jumlah_tempatTidur: true,
      harga: true,
      website: true,
      link_gmaps: true,
      lokasi: true
    }
  })
  return dataHotel
}

async function findHotelById (id) {
  const dataHotel = await prisma.hotel.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return dataHotel
}

async function editHotel (id, hotel) {
  const updateHotel = await prisma.hotel.update({
    where: {
      id: parseInt(id)
    },
    data: {
      nama_hotel: hotel.nama_hotel,
      foto: hotel.foto,
      telepon: hotel.telepon,
      alamat: hotel.alamat,
      deskripsi: hotel.deskripsi,
      jumlah_kamar: hotel.jumlah_kamar,
      jumlah_tempatTidur: hotel.jumlah_tempatTidur,
      harga: hotel.harga,
      website: hotel.website,
      link_gmaps: hotel.link_gmaps,
      lokasi: hotel.lokasi
    }
  })
  return updateHotel
}

async function deleteAllHotel () {
  return await prisma.hotel.deleteMany({})
}

async function deleteHotelById (id) {
  await prisma.hotel.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  insertHotel,
  findHotel,
  findHotelById,
  editHotel,
  deleteAllHotel,
  deleteHotelById
}
