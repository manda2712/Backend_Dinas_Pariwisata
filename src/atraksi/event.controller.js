const express = require('express')
const upload = require('../middleware/upload.middleware')
const {
  createEvent,
  getAllEvent,
  getEventById,
  editEventbyId,
  deleteEventById
} = require('./event.service')
const router = express.Router()

router.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    const newEvents = {
      nameEvent: req.body.nameEvent,
      description: req.body.description,
      foto: req.file ? `/uploads/${req.file.filename}` : null,
      location: req.body.location,
      startdate: req.body.startdate,
      enddate: req.body.enddate || null
    }
    const newEvent = await createEvent(newEvents)
    res.status(200).json(newEvent)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/get', async (req, res) => {
  try {
    const event = await getAllEvent()
    res.status(200).json({ data: event })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id)
    const event = await getEventById(eventId)
    res.status(200).send(event)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.put('/:id', upload.single('foto'), async (req, res) => {
  try {
    const eventId = req.params.id
    const event = req.body
    if (req.file) {
      event.foto = `/uploads/${req.file.filename}`
    }
    const updateEvent = await editEventbyId(eventId, event)
    res.send(updateEvent)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const eventId = req.params.id
    await deleteEventById(eventId)
    res.status(200).json({ message: 'Atraksi berhasil dihapus' })
  } catch (error) {
    res.status(400).send({
      error: error.message,
      message: 'Atraksi ini tidak ada atau sudah terhapus'
    })
  }
})

module.exports = router
