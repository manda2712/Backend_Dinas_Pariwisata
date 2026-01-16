const express = require('express')
const tourPackageService = require('./tourPackage.service')
const router = express.Router()

const upload = require('../middleware/upload.middleware')

router.post('/insert', upload.single('media'), async (req, res) => {
  try {
    const newTourPackges = {
      nama_wisata: req.body.nama_wisata,
      harga: req.body.harga,
      deskripsi: req.body.deskripsi,
      kontak: req.body.kontak,
      media: req.file ? `/uploads/${req.file.filename}` : null,
      lokasi: req.body.lokasi
    }
    const newTourPackge = await tourPackageService.createTourPackage(
      newTourPackges
    )
    res.status(201).json(newTourPackge)
  } catch (error) {
    console.error('❌ ERROR:', error)
    res.status(400).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const tourPackage = await tourPackageService.getAllTourPackage()
    res.status(200).json(tourPackage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const tourPackage = await tourPackageService.getTourPackageById(
      req.params.id
    )
    res.status(200).json(tourPackage)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.patch('/:id', upload.single('media'), async (req, res) => {
  try {
    const tourPackageId = parseInt(req.params.id)
    const tourPackage = {
      ...(req.body.nama_wisata && { nama_wisata: req.body.nama_wisata }),
      ...(req.body.harga && { harga: req.body.harga }),
      ...(req.body.deskripsi && { deskripsi: req.body.deskripsi }),
      ...(req.body.kontak && { kontak: req.body.kontak }),
      ...(req.file && { media: `/uploads/${req.file.filename}` }),
      ...(req.body.lokasi && { lokasi: req.body.lokasi })
    }
    const updateTourPackage = await tourPackageService.editTourPackageById(
      tourPackageId,
      tourPackage
    )
    res.status(200).json(updateTourPackage)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/deleteAll', async (req, res) => {
  try {
    const result = await tourPackageService.deleteAllTourPackageService()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const tourPackageId = req.params.id
    await tourPackageService.deleteTourPackageById(tourPackageId)
    res.status(200).json({ message: 'Paket Wisata berhasil dihapus' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
