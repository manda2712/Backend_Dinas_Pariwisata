const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload.middleware')
const kulinerService = require('./kuliner.service')
const { translate } = require('@vitalets/google-translate-api')

router.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    const { nama_makanan, lokasi, deskripsi } = req.body
    // 2. Terjemahkan deskripsi ke Inggris secara otomatis
    const [transDeskripsi] = await Promise.all([
      translate(deskripsi || '', { to: 'en' })
    ])

    const newKuliners = {
      id: req.body.id,
      nama_makanan: req.body.nama_makanan,
      lokasi: req.body.lokasi,
      foto: req.file ? `/uploads/${req.file.filename}` : '',
      deskripsi_id: deskripsi || '',
      deskripsi_en: transDeskripsi.text
    }
    const newKuliner = await kulinerService.createKuliner(newKuliners)
    res.status(200).json(newKuliner)
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log('body', req.body)
    console.log('file', req.file)
  }
})

router.get('/', async (req, res) => {
  try {
    const newKuliner = await kulinerService.getAllKuliner()
    res.status(200).json(newKuliner)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const kuliner = await kulinerService.getKulinerById(req.params.id)
    res.status(200).json(kuliner)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.patch('/:id', upload.single('foto'), async (req, res) => {
  try {
    const kulinerId = parseInt(req.params.id)
    const updateDataKuliner = {}
    const { deskripsi_id, nama_makanan, lokasi } = req.body

    // DESKRIPSI (FIX UTAMA)
    if (deskripsi_id) {
      const trans = await translate(deskripsi_id, { to: 'en' })
      updateDataKuliner.deskripsi_id = deskripsi_id
      updateDataKuliner.deskripsi_en = trans.text
    }

    if (req.file) updateDataKuliner.foto = `/uploads/${req.file.filename}`
    if (nama_makanan !== undefined)
      updateDataKuliner.nama_makanan = nama_makanan
    if (lokasi !== undefined) updateDataKuliner.lokasi = lokasi

    const updateKuliner = await kulinerService.updateKuliner(
      kulinerId,
      updateDataKuliner
    )

    res.status(200).json(updateKuliner)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/all', async (req, res) => {
  try {
    await kulinerService.removeAllKuliner()
    res
      .status(200)
      .json({ message: 'Semua daftar rumah makan berhasil dihapus' })
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const kuliner = req.params.id
    await kulinerService.removeKulinerById(kuliner)
    res.status(200).json({ message: 'Kuliner berhasil terhapus' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})
module.exports = router
