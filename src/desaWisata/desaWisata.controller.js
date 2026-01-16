const express = require('express')
const upload = require('../middleware/upload.middleware')
const router = express.Router()
const desaService = require('./desaWisata.service')
//1
const { translate } = require('@vitalets/google-translate-api')

router.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    const { namaDesa, lokasi, deskripsi, longitude, latitude, jenisDesa } =
      req.body
    // 2. Proses Terjemahan Otomatis
    // Menggunakan Promise.all agar proses translate berjalan berbarengan (lebih cepat)
    const [transNama, transLokasi, transDesk] = await Promise.all([
      translate(namaDesa || '', { to: 'en' }),
      translate(lokasi || '', { to: 'en' }),
      translate(deskripsi || '', { to: 'en' })
    ])

    const newDesas = {
      id: req.body.id,
      namaDesa_id: namaDesa,
      namaDesa_en: transNama.text,
      lokasi_id: lokasi,
      lokasi_en: transLokasi.text,
      deskripsi_id: deskripsi,
      deskripsi_en: transDesk.text,
      foto: req.file ? `/uploads/${req.file.filename}` : null,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      jenisDesa: req.body.jenisDesa
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
    const updateData = {}
    const {
      namaDesa_id,
      lokasi_id,
      deskripsi_id,
      longitude,
      latitude,
      jenisDesa
    } = req.body
    if (namaDesa_id) {
      const trans = await translate(namaDesa_id, { to: 'en' })
      updateData.namaDesa_id = namaDesa_id
      updateData.namaDesa_en = trans.text
    }

    if (lokasi_id) {
      const trans = await translate(lokasi_id, { to: 'en' })
      updateData.lokasi_id = lokasi_id
      updateData.lokasi_en = trans.text
    }

    if (deskripsi_id) {
      const trans = await translate(deskripsi_id, { to: 'en' })
      updateData.deskripsi_id = deskripsi_id
      updateData.deskripsi_en = trans.text
    }
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
