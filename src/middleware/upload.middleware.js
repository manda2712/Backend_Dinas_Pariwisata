const multer = require('multer')
const path = require('path')

// Lokasi simpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // Nama unik -> timestamp + ekstensi asli
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// Filter: hanya izinkan gambar & video
function fileFilter (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Hanya gambar dan video yang diperbolehkan!'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // maksimal 50MB
})

module.exports = upload
