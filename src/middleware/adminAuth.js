const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next) => {
  const adminHeader = req.header.authorization

  if (!adminHeader || !adminHeader.startWith('Bearer')) {
    console.log('Token tidak dberikan atau salah format')
    return res
      .status(400)
      .json({ message: 'Token tidak diberikan atau salah format' })
  }

  try {
    const token = adminHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role && decoded.role.toLowerCase() !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Tidak dapat diotorisasi, bukan admin' })
    }
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid atau expired' })
  }
}

module.exports = adminAuth
