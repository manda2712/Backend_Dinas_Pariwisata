const express = require('express')
const tourPackageService = require('./tourPackage.service')
const router = express.Router()
const upload = require('../middleware/upload.middleware')

router.post('/insert', upload.single('media'), async (req, res) => {
  try {
    const { 
      nama_wisata_id,
      nama_wisata_en,
      deskripsi_id,
      deskripsi_en,
      lokasi_id,
      lokasi_en,
      harga,
      kontak } = req.body

    const newTourPackges = {
      id: req.body.id,
      nama_wisata_id: nama_wisata_id,
      nama_wisata_en: nama_wisata_en || '',
      harga: harga,
      deskripsi_id: deskripsi_id,
      deskripsi_en: deskripsi_en || '',
      kontak: kontak,
      media: req.file ? `/uploads/${req.file.filename}` : null,
      lokasi_id: lokasi_id,
      lokasi_en: lokasi_en || ''
    }
    const newTourPackge = await tourPackageService.createTourPackage(newTourPackges)
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
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const tourPackage = await tourPackageService.getTourPackageById(req.params.id)
    console.log('Data dari DB:', tourPackage)
    res.status(200).json(tourPackage)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.patch('/:id', upload.single('media'), async (req, res) => {
  try {
    const tourPackageId = parseInt(req.params.id)
    const updateDataPackage = { ...req.body }

    // const { nama_wisata_id, deskripsi_id, lokasi_id } = req.body
    if (req.file) updateDataPackage.media = `/uploads/${req.file.filename}`
    if (req.body.harga) updateDataPackage.harga = req.body.harga
    if (req.body.kontak) updateDataPackage.kontak = req.body.kontak

    const updateTourPackage = await tourPackageService.editTourPackageById(tourPackageId, updateDataPackage)
    res.status(200).json(updateTourPackage)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// router.delete('/deleteAll', async (req, res) => {
//   try {
//     const result = await tourPackageService.deleteAllTourPackageService()
//     res.status(200).json(result)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

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
