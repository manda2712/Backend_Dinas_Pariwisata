const {
  insertEvent,
  findEvent,
  findEventById,
  deleteFotoFile,
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

// Di event.service.js
async function getEventById (id) {
  const event = await findEventById(id)

  // Jika event null, lempar error di sini
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

async function removeEventFoto (id) {
  // 1. Ambil data event
  const event = await getEventById(id)

  // 2. Sekarang 'event' sudah pasti objek data atau proses berhenti di atas.
  // Cek apakah kolom foto kosong
  if (!event.foto || event.foto === '') {
    throw new Error('Tidak ada foto untuk dihapus pada event ini')
  }

  // 3. Eksekusi hapus
  return await deleteFotoFile(id)
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
  removeEventFoto,
  deleteEventById
}
