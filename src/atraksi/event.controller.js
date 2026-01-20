const express = require('express')
const upload = require('../middleware/upload.middleware')
const eventService =  require('./event.service')
// const { translate } = require('@vital/ets/google-translate-api')
const router = express.Router()

router.post('/insert', upload.single('foto'), async (req, res) => {
  try {
    // Ambil data yang sudah ditranslate dari Frontend
    const { 
      nameEvent, 
      description_id, 
      description_en, 
      location_id, 
      location_en, 
      startdate, 
      enddate 
    } = req.body

    // const [transDesk, transLoc] = await Promise.all([
    //   translate(description || '', { to: 'en' }),
    //   translate(location || '', { to: 'en' })
    // ])

    const newEvents = {
      id: req.body.id,
      nameEvent: req.body.nameEvent,
      description_id: description_id,
      description_en: description_en || '',
      foto: req.file ? `/uploads/${req.file.filename}` : null,
      location_id: location_id,
      location_en: location_en || '',
      startdate: req.body.startdate,
      enddate: req.body.enddate || null
    }
    const newEvent = await eventService.createEvent(newEvents)
    res.status(200).json(newEvent)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const event = await eventService.getAllEvent()
    res.status(200).json({ data: event })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id)
    console.log('Data dari DB:', event)
    res.status(200).json(event)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch('/:id', upload.single('foto'), async (req, res) => {
  try {
    const eventId = parseInt(req.params.id)
    const updateDataEvent = {...req.body }
    // Ambil semua field dari req.body
    // const { 
    //   nameEvent, 
    //   description_id, 
    //   description_en, 
    //   location_id, 
    //   location_en, 
    //   startdate, 
    //   enddate 
    // } = req.body

    // const updateDataEvent = {
    //   ...(nameEvent && { nameEvent }),
    //   ...(description_id && { description_id }),
    //   ...(description_en && { description_en }), // Update deskripsi EN dari FE
    //   ...(location_id && { location_id }),
    //   ...(location_en && { location_en }), // Update lokasi EN dari FE
    //   ...(startdate && { startdate }),
    //   ...(enddate && { enddate }),
    // } 

    if (req.file) updateDataEvent.foto = `/uploads/${req.file.filename}`
    if (req.body.startdate) updateDataEvent.startdate = req.body.startdate
    if (req.body.enddate) updateDataEvent.enddate = req.body.enddate

    const updateEvent = await eventService.editEventbyId(eventId, updateDataEvent)

    // const { description_id, location_id } = req.body

    res.status(200).json(updateEvent)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const eventId = req.params.id
    await eventService.deleteEventById(eventId)
    res.status(200).json({ message: 'Atraksi berhasil dihapus' })
  } catch (error) {
    res.status(400).send({
      error: error.message,
      message: 'Atraksi ini tidak ada atau sudah terhapus'
    })
  }
})

module.exports = router
