const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload.middleware')
const hotelService = require('./hotel.service')

router.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    const newHotels = {
      nama_hotel: req.body.nama_hotel,
      foto: req.file ? `/uploads/${req.file.filename}` : null,
      telepon: req.body.telepon,
      alamat: req.body.alamat,
      deskripsi: req.body.deskripsi,
      jumlah_kamar: req.body.jumlah_kamar,
      jumlah_tempatTidur: req.body.jumlah_tempatTidur,
      harga: req.body.harga,
      website: req.body.website,
      link_gmaps: req.body.link_gmaps,
      lokasi: req.body.lokasi
    }
    const newHotel = await hotelService.createHotel(newHotels)
    res.status(200).json(newHotel)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const newHotel = await hotelService.getHotel()
    res.status(200).json(newHotel)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const hotel = await hotelService.getHotelById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id', upload.single('foto'), async (req, res) => {
  try {
    const hotelId = parseInt(req.params.id)
    const hotel = {
      ...(req.body.nama_hotel && { nama_hotel: req.body.nama_hotel }),
      ...(req.file && { foto: `/uploads/${req.file.filename}` }),
      ...(req.body.telepon && { telepon: req.body.telepon }),
      ...(req.body.alamat && { alamat: req.body.alamat }),
      ...(req.body.deskripsi && { deskripsi: req.body.deskripsi }),
      ...(req.body.jumlah_kamar && { jumlah_kamar: req.body.jumlah_kamar }),
      ...(req.body.jumlah_tempatTidur && {
        jumlah_tempatTidur: req.body.jumlah_tempatTidur
      }),
      ...(req.body.harga && { harga: req.body.harga }),
      ...(req.body.website && { website: req.body.website }),
      ...(req.body.link_gmaps && { link_gmaps: req.body.link_gmaps }),
      ...(req.body.lokasi && { lokasi: req.body.lokasi })
    }
    const updateHotel = await hotelService.updateHotelById(hotelId, hotel)
    res.status(200).json(updateHotel)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete('/all', async (req, res) => {
  try {
    await hotelService.removeAllHotel()
    res.status(200).json({ message: 'Semua daftar hotel berhasil dihapus' })
  } catch (error) {
    res.status(200).json(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const hotel = req.params.id
    await hotelService.removeHotelById(hotel)
    res.status(200).json({ message: 'Kuliner berhasil dihapus' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
