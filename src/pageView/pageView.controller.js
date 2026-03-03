const express = require('express')
const router = express.Router()
const pageViewService = require('./pageView.service')

router.post('/', async (req, res) => {
  try {
    const { visitorId, page } = req.body

    if (!visitorId || !page) {
      return res.status(400).json({
        message: 'visitorId dan page wajib dikirim'
      })
    }

    const pageView = await pageViewService.registerPageView(visitorId, page)
    res.status(201).json(pageView)
  } catch (error) {
    console.error('Error register pageView:', error)

    if (error.message.includes('tidak ditemukan')) {
      return res.status(404).json({ message: error.message })
    }

    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/summary', async (req, res) => {
  try {
    const summary = await pageViewService.getPageViewSummary()
    res.status(200).json(summary)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/chart', async (req, res) => {
  try {
    const { filter = 'daily' } = req.query
    const chartData = await pageViewService.getPageViewChart(filter)
    res.status(200).json(chartData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
