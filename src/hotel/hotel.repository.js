const prisma = require('../db')
const fs = require('fs')
const path = require('path')

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
      lokasi: hotel.lokasi,
      link_video: hotel.link_video
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
      lokasi: true,
      link_video: true
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
      ...(hotel.nama_hotel && { nama_hotel: hotel.nama_hotel }),
      ...(hotel.foto && { foto: hotel.foto }),
      ...(hotel.telepon && { telepon: hotel.telepon }),
      ...(hotel.jumlah_kamar && { jumlah_kamar: hotel.jumlah_kamar }),
      ...(hotel.jumlah_tempatTidur && {
        jumlah_tempatTidur: hotel.jumlah_tempatTidur
      }),
      ...(hotel.harga && { harga: hotel.harga }),
      ...(hotel.website && { website: hotel.website }),
      ...(hotel.link_gmaps && { link_gmaps: hotel.link_gmaps }),
      ...(hotel.lokasi && { lokasi: hotel.lokasi }),
      ...(hotel.link_video !== undefined && { link_video: hotel.link_video })
    }
  })
  return updateHotel
}

async function deleteAllHotel () {
  return await prisma.hotel.deleteMany({})
}

async function deleteFotoFile (id) {
  const dataHotel = await prisma.hotel.findUnique({
    where: { id: parseInt(id) },
    select: { foto: true }
  })

  if (dataHotel && dataHotel.foto) {
    const fileName = dataHotel.foto.replace('/uploads/', '')
    const filePath = path.join(__dirname, '../public/uploads', fileName)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  return await prisma.hotel.update({
    where: { id: parseInt(id) },
    data: {
      foto: ''
    }
  })
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
  deleteFotoFile,
  deleteAllHotel,
  deleteHotelById
}
