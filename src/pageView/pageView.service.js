const pageViewRepo = require('./pageView.repository')
const prisma = require('../db')

/**
 * Catat page view baru
 * visitor boleh berkali-kali (setiap buka page = 1 row)
 */
async function registerPageView (visitorId, page) {
  const visitor = await prisma.visitor.findUnique({
    where: { uid: visitorId }
  })

  if (!visitor) {
    throw new Error(`Visitor dengan uid ${visitorId} tidak ditemukan`)
  }

  return pageViewRepo.createPageView({ visitorId, page })
}

/**
 * SUMMARY DASHBOARD
 * - visitors  = unique visitor
 * - visits    = total page views
 */
async function getPageViewSummary () {
  const now = new Date()

  // ===== DATE RANGE =====
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startYesterday = new Date(startToday)
  startYesterday.setDate(startYesterday.getDate() - 1)

  const startWeek = new Date(startToday)
  startWeek.setDate(startWeek.getDate() - startWeek.getDay())

  const startLastWeek = new Date(startWeek)
  startLastWeek.setDate(startLastWeek.getDate() - 7)

  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return {
    today: {
      visitors: await pageViewRepo.countUniqueVisitors({
        createdAt: { gte: startToday }
      }),
      visits: await pageViewRepo.countPageViews({
        createdAt: { gte: startToday }
      })
    },

    yesterday: {
      visitors: await pageViewRepo.countUniqueVisitors({
        createdAt: { gte: startYesterday, lt: startToday }
      }),
      visits: await pageViewRepo.countPageViews({
        createdAt: { gte: startYesterday, lt: startToday }
      })
    },

    thisWeek: {
      visitors: await pageViewRepo.countUniqueVisitors({
        createdAt: { gte: startWeek }
      }),
      visits: await pageViewRepo.countPageViews({
        createdAt: { gte: startWeek }
      })
    },

    lastWeek: {
      visitors: await pageViewRepo.countUniqueVisitors({
        createdAt: { gte: startLastWeek, lt: startWeek }
      }),
      visits: await pageViewRepo.countPageViews({
        createdAt: { gte: startLastWeek, lt: startWeek }
      })
    },

    thisMonth: {
      visitors: await pageViewRepo.countUniqueVisitors({
        createdAt: { gte: startMonth }
      }),
      visits: await pageViewRepo.countPageViews({
        createdAt: { gte: startMonth }
      })
    },

    allDays: {
      visitors: await pageViewRepo.countUniqueVisitors(),
      visits: await pageViewRepo.countPageViews()
    }
  }
}

/**
 * Data chart
 */
async function getPageViewChart (filter = 'daily') {
  return pageViewRepo.getPageViewsGrouped(filter)
}

module.exports = {
  registerPageView,
  getPageViewSummary,
  getPageViewChart
}
