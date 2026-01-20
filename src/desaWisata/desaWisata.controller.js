const express = require('express')
const upload = require('../middleware/upload.middleware')
const router = express.Router()
const desaService = require('./desaWisata.service')

router.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    const { 
      namaDesa_id, 
      namaDesa_en, 
      lokasi_id, 
      lokasi_en, 
      deskripsi_id, 
      deskripsi_en, 
      longitude, 
      latitude, 
      jenisDesa 
    } = req.body

    const newDesas = {
      id: req.body.id,
      namaDesa_id: namaDesa_id,
      namaDesa_en: namaDesa_en || '',
      lokasi_id: lokasi_id,
      lokasi_en: lokasi_en || '',
      deskripsi_id: deskripsi_id,
      deskripsi_en: deskripsi_en || '',
      foto: req.file ? `/uploads/${req.file.filename}` : null,
      longitude: longitude,
      latitude: latitude,
      jenisDesa: jenisDesa
    }
    const newDesa = await desaService.createDesa(newDesas)
    res.status(201).json(newDesa)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const desaWisata = await desaService.getAllDesa()
    res.status(200).json(desaWisata)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const desaWisata = await desaService.getDesaId(req.params.id)
    console.log('Data dari DB:', desaWisata)
    res.status(200).json(desaWisata)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.patch('/:id', upload.single('foto'), async (req, res) => {
  try {
    const desaWisataId = parseInt(req.params.id)
    const updateData = { ...req.body }

    if (req.file) updateData.foto = `/uploads/${req.file.filename}`
    if (req.body.longitude) updateData.longitude = req.body.longitude
    if (req.body.latitude) updateData.latitude = req.body.latitude
    if (req.body.jenisDesa) updateData.jenisDesa = req.body.jenisDesa

    const updateDesa = await desaService.editDesaById(desaWisataId, updateData)
    res.status(200).json(updateDesa)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const desaWistaId = req.params.id
    await desaService.deleteDesaById(desaWistaId)
    res.status(200).json({ message: 'Desa Wisata berhasil terhapus' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
