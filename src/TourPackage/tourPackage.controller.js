const express = require('express')
const tourPackageService = require('./tourPackage.service')
const router = express.Router()

const upload = require('../middleware/upload.middleware')
const { translate } = require('@vitalets/google-translate-api')

router.post('/insert', upload.single('media'), async (req, res) => {
  try {
    const { nama_wisata, deskripsi, lokasi } = req.body

    const [transNama, transDesk, transLok] = await Promise.all([
      translate(nama_wisata || '', { to: 'en' }),
      translate(deskripsi || '', { to: 'en' }),
      translate(lokasi || '', { to: 'en' })
    ])
    const newTourPackges = {
      nama_wisata_id: nama_wisata,
      nama_wisata_en: transNama.text,
      harga: req.body.harga,
      deskripsi_id: deskripsi,
      deskripsi_en: transDesk.text,
      kontak: req.body.kontak,
      media: req.file ? `/uploads/${req.file.filename}` : null,
      lokasi_id: lokasi,
      lokasi_en: transLok.text
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
    const updateDataPackage = {}

    const { nama_wisata_id, deskripsi_id, lokasi_id } = req.body

    if (nama_wisata_id) {
      const trans = await translate(nama_wisata_id, { to: 'en' })
      updateDataPackage.nama_wisata_id = namaDesa_id
      updateData.nama_wisata_en = trans.text
    }

    if (deskripsi_id) {
      const trans = await translate(deskripsi_id, { to: 'en' })
      updateDataPackage.deskripsi_id = deskripsi_id
      updateDataPackage.deskripsi_en = trans.text
    }

    if (lokasi_id) {
      const trans = await translate(lokasi_id, { to: 'en' })
      updateDataPackage.lokasi_id = lokasi_id
      updateDataPackage.lokasi_en = trans.text
    }
    if (req.file) updateDataPackage.media = `/uploads/${req.file.filename}`
    if (req.body.harga) updateDataPackage.harga = req.body.harga
    if (req.body.kontak) updateDataPackage.kontak = req.body.kontak

    const updateTourPackage = await tourPackageService.editTourPackageById(
      tourPackageId,
      updateDataPackage
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
