// const express = require('express')
// const router = express.Router()
// const pageViewService = require('./pageView.service')

// /**
//  * POST /api/pageViews
//  * Catat page view baru
//  * Body: { visitorId: string, page: string }
//  */
// router.post('/', async (req, res) => {
//   try {
//     const { visitorId, page } = req.body

//     if (!visitorId || !page) {
//       return res
//         .status(400)
//         .json({ message: 'visitorId dan page wajib dikirim' })
//     }

//     // register page view
//     const pageView = await pageViewService.registerPageView(visitorId, page)
//     res.status(201).json(pageView)
//   } catch (error) {
//     console.error('Error register pageView:', error)

//     // jika error karena foreign key (visitor tidak ada), beri pesan jelas
//     if (error.message.includes('tidak ditemukan')) {
//       return res.status(404).json({ message: error.message })
//     }

//     res.status(500).json({ message: error.message })
//   }
// })

// /**
//  * GET /api/pageViews/summary?filter=daily|monthly|yearly
//  * Ambil summary visitor & page view
//  */
// router.get('/summary', async (req, res) => {
//   try {
//     const { filter = 'daily' } = req.query
//     const summary = await pageViewService.getPageViewSummary(filter)
//     res.status(200).json(summary)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// /**
//  * GET /api/pageViews/chart?filter=daily|monthly|yearly
//  * Ambil data chart page views
//  */
// router.get('/chart', async (req, res) => {
//   try {
//     const { filter = 'daily' } = req.query
//     const chartData = await pageViewService.getPageViewChart(filter)
//     res.status(200).json(chartData)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// module.exports = router

const express = require('express')
const router = express.Router()
const pageViewService = require('./pageView.service')

/**
 * POST /api/pageViews
 * Catat page view baru
 * Body: { visitorId: string (uid), page: string }
 */
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

/**
 * GET /api/pageViews/summary
 * Ambil summary dashboard:
 * today, yesterday, thisWeek, lastWeek, thisMonth, allDays
 */
router.get('/summary', async (req, res) => {
  try {
    const summary = await pageViewService.getPageViewSummary()
    res.status(200).json(summary)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

/**
 * GET /api/pageViews/chart?filter=daily|monthly|yearly
 * Ambil data chart page views
 */
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
