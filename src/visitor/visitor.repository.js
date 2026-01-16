// const prisma = require('../db')

// async function createVisitor (data) {
//   return prisma.visitor.create({
//     data
//   })
// }

// async function findVisitorByUid (uid) {
//   return prisma.visitor.findUnique({
//     where: { uid }
//   })
// }

// async function findVisitorById (id) {
//   return prisma.visitor.findUnique({
//     where: { id }
//   })
// }

// async function countAllVisitors () {
//   return prisma.visitor.count()
// }

// module.exports = {
//   findVisitorByUid,
//   findVisitorById,
//   createVisitor,
//   countAllVisitors
// }

const prisma = require('../db')

async function createVisitor (data) {
  return prisma.visitor.create({ data })
}

async function findVisitorByUid (uid) {
  return prisma.visitor.findUnique({ where: { uid } })
}

async function findVisitorById (id) {
  return prisma.visitor.findUnique({ where: { id } })
}

async function countAllVisitors () {
  return prisma.visitor.count()
}

// Hitung visitor berdasarkan tanggal
async function countVisitorsByDate (startDate) {
  return prisma.visitor.count({
    where: startDate ? { createdAt: { gte: startDate } } : {}
  })
}

// Ambil visitor beserta pageViews
async function getVisitorWithPageViews (uid) {
  return prisma.visitor.findUnique({
    where: { uid },
    include: { pageViews: true }
  })
}

// Hitung pageView berdasarkan tanggal
async function countPageViewsByDate (startDate) {
  return prisma.pageView.count({
    where: startDate ? { createdAt: { gte: startDate } } : {}
  })
}

// Ambil pageViews per range waktu untuk chart
async function getPageViewsGrouped (filter) {
  const pageViews = await prisma.pageView.findMany()
  const now = new Date()

  if (filter === 'daily') {
    // group by day of current month
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const data = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const views = pageViews.filter(
        pv =>
          pv.createdAt.getFullYear() === currentYear &&
          pv.createdAt.getMonth() === currentMonth &&
          pv.createdAt.getDate() === day
      ).length
      return { label: day.toString().padStart(2, '0'), views }
    })
    return data
  } else if (filter === 'monthly') {
    const data = Array.from({ length: 12 }, (_, i) => {
      const views = pageViews.filter(pv => pv.createdAt.getMonth() === i).length
      const label = new Date(0, i).toLocaleString('id-ID', { month: 'short' })
      return { label, views }
    })
    return data
  } else if (filter === 'yearly') {
    const years = [...new Set(pageViews.map(pv => pv.createdAt.getFullYear()))]
    return years.map(year => ({
      label: year.toString(),
      views: pageViews.filter(pv => pv.createdAt.getFullYear() === year).length
    }))
  } else {
    return []
  }
}

module.exports = {
  createVisitor,
  findVisitorByUid,
  findVisitorById,
  countAllVisitors,
  countVisitorsByDate,
  countPageViewsByDate,
  getVisitorWithPageViews,
  getPageViewsGrouped
}
