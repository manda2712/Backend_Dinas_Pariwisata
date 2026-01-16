const express = require('express')
const upload = require('../middleware/upload.middleware')
const {
  createEvent,
  getAllEvent,
  getEventById,
  editEventbyId,
  deleteEventById
} = require('./event.service')
const { translate } = require('@vitalets/google-translate-api')
const router = express.Router()

router.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    const { description, location } = req.body

    const [transDesk, transLoc] = await Promise.all([
      translate(description || '', { to: 'en' }),
      translate(location || '', { to: 'en' })
    ])

    const newEvents = {
      nameEvent: req.body.nameEvent,
      description_id: description,
      description_en: transDesk.text,
      foto: req.file ? `/uploads/${req.file.filename}` : null,
      location_id: location,
      location_en: transLoc.text,
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
    const eventId = parseInt(req.params.id)
    const updateDataEvent = {}

    const { description_id, location_id } = req.body

    if (req.body.nameEvent) updateDataEvent.nameEvent = req.body.nameEvent
    if (description_id) {
      const trans = await translate(description_id, { to: 'en' })
      updateDataEvent.description_id = description_id
      updateDataEvent.description_en = trans.text
    }
    if (location_id) {
      const trans = await translate(location_id, { to: 'en' })
      updateDataEvent.location_id = location_id
      updateDataEvent.location_en = trans.text
    }
    if (req.file) {
      updateDataEvent.foto = `/uploads/${req.file.filename}`
    }
    if (req.body.startdate) updateDataEvent.startdate = req.body.startdate
    if (req.body.enddate) updateDataEvent.enddate = req.body.enddate
    const updateEvent = await editEventbyId(eventId, updateDataEvent)
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
