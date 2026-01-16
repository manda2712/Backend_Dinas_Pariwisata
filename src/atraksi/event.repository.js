const prisma = require('../db')

async function insertEvent (event) {
  const newEvent = await prisma.event.create({
    data: {
      nameEvent: event.nameEvent,
      description: event.description,
      foto: event.foto,
      location: event.location,
      startdate: event.startdate ? new Date(event.startdate) : null,
      enddate: event.enddate ? new Date(event.enddate) : null
    }
  })
  return newEvent
}

async function findEvent () {
  const event = await prisma.event.findMany({
    select: {
      id: true,
      nameEvent: true,
      description: true,
      location: true,
      foto: true,
      startdate: true,
      enddate: true
    }
  })
  return event
}

async function findEventById (id) {
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return { event }
}

async function editEvent (id, event) {
  const updateEvent = await prisma.event.update({
    where: {
      id: parseInt(id) // ✅ konversi biar sesuai tipe Prisma
    },
    data: {
      nameEvent: event.nameEvent,
      description: event.description,
      location: event.location,
      foto: event.foto,
      startdate: event.startdate ? new Date(event.startdate) : undefined,
      enddate: event.enddate ? new Date(event.enddate) : undefined
    }
  })
  return updateEvent
}

async function deleteEvent (id) {
  await prisma.event.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  insertEvent,
  findEvent,
  findEventById,
  editEvent,
  deleteEvent
}
