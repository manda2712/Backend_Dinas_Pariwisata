const visitorRepo = require('./visitor.repository')

/**
 * Daftarkan visitor baru atau ambil visitor yang sudah ada berdasarkan UID
 * @param {string} uid - Unique visitor ID
 * @param {string} userAgent - User agent dari browser
 * @returns Visitor object
 */
async function registerVisitor (uid, userAgent) {
  let visitor = await visitorRepo.findVisitorByUid(uid)

  if (!visitor) {
    visitor = await visitorRepo.createVisitor({
      uid,
      userAgent
    })
  }

  return visitor
}

/**
 * Ambil visitor berdasarkan ID
 * @param {number} id
 * @returns Visitor object
 */
async function getVisitorById (id) {
  return visitorRepo.findVisitorByUid(uid)
}

/**
 * Ambil summary visitor & page view berdasarkan filter waktu
 * @param {string} filter - 'daily' | 'monthly' | 'yearly'
 * @returns { totalVisitors: number, totalPageViews: number }
 */
async function getVisitorSummary (filter = 'daily') {
  const now = new Date()
  let startDate = null

  if (filter === 'daily') {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  } else if (filter === 'monthly') {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  } else if (filter === 'yearly') {
    startDate = new Date(now.getFullYear(), 0, 1)
  }

  const totalVisitors = await visitorRepo.countVisitorsByDate(startDate)
  const totalPageViews = await visitorRepo.countPageViewsByDate(startDate)

  return { totalVisitors, totalPageViews }
}

/**
 * Ambil data chart page views sesuai filter
 * @param {string} filter - 'daily' | 'monthly' | 'yearly'
 * @returns Array<{ label: string, views: number }>
 */
async function getVisitorChart (filter = 'daily') {
  const data = await visitorRepo.getPageViewsGrouped(filter)
  return data
}

module.exports = {
  registerVisitor,
  getVisitorById,
  getVisitorSummary,
  getVisitorChart
}
