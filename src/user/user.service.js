const jwt = require('jsonwebtoken')
const adminRepository = require('./user.repository')
const bcrypt = require('bcrypt')

function generateToken (admin) {
  return jwt.sign(
    { id: admin.id, username: admin.username, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

async function register (nama_Lengkap, jenis_kelamin, username, password, role) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = {
      nama_Lengkap,
      jenis_kelamin,
      username,
      password: hashedPassword,
      role: 'Admin'
    }
    const newAdmin = await adminRepository.createAdmin(admin)
    return newAdmin
  } catch (error) {
    throw new Error('Failed Register User')
  }
}

async function login (username, password) {
  const admin = await adminRepository.findAdmin(username)
  if (!admin) {
    throw new Error('username tidak cocok')
  }

  const isValidPassword = await bcrypt.compare(password, admin.password)

  if (!isValidPassword) {
    throw new Error('Password Tidak Cocok')
  }
  console.log('login as:', admin)
  const token = generateToken(admin)
  return { admin, token }
}

async function getAdminById (id) {
  const admin = await adminRepository.findAdminById(id)

  if (!admin) {
    throw new Error('Cannot Find User By Id')
  }
  return admin
}

async function patchAdminById (id, body) {
  const updateData = { ...body }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10)
  }

  return await adminRepository.editAdminById(id, updateData)
}
module.exports = {
  register,
  login,
  getAdminById,
  patchAdminById
}
