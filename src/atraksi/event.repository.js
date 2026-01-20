const prisma = require('../db')

async function insertEvent (event) {
  const newEvent = await prisma.event.create({
    data: {
      nameEvent: event.nameEvent,
      description_id: event.description_id,
      description_en: event.description_en,
      foto: event.foto,
      location_id: event.location_id,
      location_en: event.location_en,
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
      description_id: true,
      description_en: true,
      location_id: true,
      location_en: true,
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
      ...(event.nameEvent && { nameEvent: event.nameEvent }),
      ...(event.location_id && { location_id: event.location_id }),
      ...(event.location_en && { location_en: event.location_en }),
      ...(event.description_id && { description_id: event.description_id }),
      ...(event.description_en && { description_en: event.description_en }),
      ...(event.foto && { foto: event.foto }),
      ...(event.startdate && { startdate: new Date(event.startdate) }),
      ...(event.enddate && { enddate: new Date(event.enddate) })
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
