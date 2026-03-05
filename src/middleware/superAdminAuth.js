// const jwt = require('jsonwebtoken')

// function superAdminAuth (req, res, next) {
//   const superAuth = req.headers.authorization

//   if (!superAuth || !superAuth.startsWith('Bearer')) {
//     return res.status(401).json({ message: 'Token tidak diberikan' })
//   }

//   const token = superAuth.split(' ')[1]

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     if (!decoded.id) {
//       return res
//         .status(401)
//         .json({ message: 'Super Admin tidak ditemukan dalam token' })
//     }
//     req.user = decoded
//     next()
//   } catch (error) {
//     return res.status(403).json({ message: 'Token tidak valid!' })
//   }
// }

// module.exports = superAdminAuth

const jwt = require('jsonwebtoken')

function superAdminAuth (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak diberikan' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // CEK ROLE DI SINI
    if (decoded.role !== 'superAdmin') {
      return res.status(403).json({
        message: 'Akses ditolak! Hanya Super Admin yang diizinkan.'
      })
    }

    req.user = decoded
    next()
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Token tidak valid atau kadaluarsa!' })
  }
}

module.exports = superAdminAuth
