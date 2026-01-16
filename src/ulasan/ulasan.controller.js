const express = require('express')
const {
  createUlasan,
  getAllUlasan,
  getUlasanById,
  editUlasanById,
  deleteUlasanById
} = require('./ulasan.service')
const router = express.Router()

router.post('/insert', async (req, res) => {
  try {
    const newUlasans = req.body
    const newUlasan = await createUlasan(newUlasans)
    res.status(201).json(newUlasan)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const ulasan = await getAllUlasan()
    res.status(200).json(ulasan)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const ulasan = await getUlasanById(req.params.id)
    res.status(200).json(ulasan)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedUlasan = await editUlasanById(req.params.id, req.body)
    res.status(200).json(updatedUlasan)
  } catch (error) {
    res.status(400).json({ message: message.error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await deleteUlasanById(req.params.id)
    res.status(200).json({ message: 'Ulasan berhasil dihapus' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
module.exports = router
