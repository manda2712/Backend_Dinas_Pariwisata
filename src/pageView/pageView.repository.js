const prisma = require('../db')

/**
 * Simpan page view
 * NOTE: validasi visitor dilakukan di SERVICE
 */
async function createPageView (data) {
  return prisma.pageView.create({
    data: {
      visitorId: data.visitorId,
      page: data.page
    }
  })
}

/**
 * Hitung visitor unik
 */
async function countUniqueVisitors (where = {}) {
  const result = await prisma.pageView.groupBy({
    by: ['visitorId'],
    where
  })
  return result.length
}

/**
 * Hitung visitor unik berdasarkan rentang tanggal
 */
async function countUniqueVisitorsByDateRange (
  startDate = null,
  endDate = null
) {
  const where = {}

  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = startDate
    if (endDate) where.createdAt.lt = endDate // ⬅️ PENTING (bukan lte)
  }

  const result = await prisma.pageView.groupBy({
    by: ['visitorId'],
    where
  })

  return result.length
}

/**
 * Hitung total page views
 */
async function countPageViews (where = {}) {
  return prisma.pageView.count({ where })
}

/**
 * Data chart (OPTIMIZED)
 */
async function getPageViewsGrouped (filter = 'daily') {
  const now = new Date()

  // ===== DAILY (per hari bulan ini) =====
  if (filter === 'daily') {
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const rows = await prisma.pageView.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: startMonth, lt: endMonth }
      },
      _count: { _all: true }
    })

    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate()

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const total = rows
        .filter(r => r.createdAt.getDate() === day)
        .reduce((sum, r) => sum + r._count._all, 0)

      return {
        label: day.toString().padStart(2, '0'),
        views: total
      }
    })
  }

  // ===== MONTHLY (per bulan tahun ini) =====
  if (filter === 'monthly') {
    const startYear = new Date(now.getFullYear(), 0, 1)
    const endYear = new Date(now.getFullYear() + 1, 0, 1)

    const rows = await prisma.pageView.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: startYear, lt: endYear }
      },
      _count: { _all: true }
    })

    return Array.from({ length: 12 }, (_, i) => {
      const total = rows
        .filter(r => r.createdAt.getMonth() === i)
        .reduce((sum, r) => sum + r._count._all, 0)

      return {
        label: new Date(0, i).toLocaleString('id-ID', { month: 'short' }),
        views: total
      }
    })
  }

  // ===== YEARLY =====
  if (filter === 'yearly') {
    const rows = await prisma.pageView.groupBy({
      by: ['createdAt'],
      _count: { _all: true }
    })

    const map = {}

    rows.forEach(r => {
      const year = r.createdAt.getFullYear()
      map[year] = (map[year] || 0) + r._count._all
    })

    return Object.keys(map)
      .sort()
      .map(year => ({
        label: year,
        views: map[year]
      }))
  }

  return []
}

module.exports = {
  createPageView,
  countUniqueVisitors,
  countUniqueVisitorsByDateRange,
  countPageViews,
  getPageViewsGrouped
}
