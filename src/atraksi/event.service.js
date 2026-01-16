const {
  insertEvent,
  findEvent,
  findEventById,
  editEvent,
  deleteEvent
} = require('./event.repository')

async function createEvent (eventData) {
  const newEvent = await insertEvent(eventData)
  return newEvent
}

async function getAllEvent () {
  const event = await findEvent()
  return event
}

async function getEventById (id) {
  const event = await findEventById(id)
  if (!event) {
    throw new Error('Event Not Found')
  }
  return event
}

async function editEventbyId (id, event) {
  await getEventById(id)
  const updateEvent = await editEvent(id, event)
  return updateEvent
}

async function deleteEventById (id) {
  await getEventById(id)
  await deleteEvent(id)
}

module.exports = {
  createEvent,
  getAllEvent,
  getEventById,
  editEventbyId,
  deleteEventById
}
