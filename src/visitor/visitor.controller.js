const express = require('express')
const router = express.Router()
const visitorService = require('./visitor.service')

router.post('/', async (req, res) => {
  try {
    const { uid } = req.body

    if (!uid) {
      return res.status(400).json({ message: 'UID wajib dikirim' })
    }

    const userAgent = req.headers['user-agent']
    const visitor = await visitorService.registerVisitor(uid, userAgent)

    res.status(200).json(visitor)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

router.get('/summary', async (req, res) => {
  try {
    const { filter = 'daily' } = req.query
    const summary = await visitorService.getVisitorSummary(filter)
    res.status(200).json(summary)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/chart', async (req, res) => {
  try {
    const { filter = 'daily' } = req.query
    const chartData = await visitorService.getVisitorChart(filter)
    res.status(200).json(chartData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
