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

async function insertAdmin (newData) {
  // 1. Hash password-nya
  const hashedPassword = await bcrypt.hash(newData.password, 10)

  // 2. Susun objek data secara eksplisit agar tidak ada yang terlewat
  const adminData = {
    nama_Lengkap: newData.nama_Lengkap,
    jenis_kelamin: newData.jenis_kelamin,
    username: newData.username,
    password: hashedPassword,
    role: newData.role || 'Admin' // <--- Menjamin role ada nilainya
  }

  // 3. Kirim ke repository
  const newAdmin = await adminRepository.createAdmin(adminData)
  return newAdmin
}

async function getAllAdmin () {
  const admin = adminRepository.findAdmin()
  return admin
}

async function getAdminById (id) {
  const admin = await adminRepository.findAdminById(id)

  if (!admin) {
    throw new Error('Cannot Find User By Id')
  }
  return admin
}

async function patchAdminById (id, body) {
  // 1. Ambil data yang dikirim saja
  const updateData = {}

  // 2. Hanya masukkan ke updateData jika field tersebut ada nilainya (tidak undefined)
  if (body.nama_Lengkap) updateData.nama_Lengkap = body.nama_Lengkap
  if (body.jenis_kelamin) updateData.jenis_kelamin = body.jenis_kelamin
  if (body.username) updateData.username = body.username
  if (body.role) updateData.role = body.role

  // 3. Khusus password, harus di-hash dulu kalau ada perubahan
  if (body.password) {
    updateData.password = await bcrypt.hash(body.password, 10)
  }

  // Jika ternyata body kosong, lempar error
  if (Object.keys(updateData).length === 0) {
    throw new Error('Tidak ada data yang diubah')
  }

  return await adminRepository.editAdminById(id, updateData)
}

async function deleteAdminById (id) {
  await adminRepository.findAdminById(id)
  await adminRepository.deleteAdmin(id)
}
module.exports = {
  register,
  login,
  insertAdmin,
  getAllAdmin,
  getAdminById,
  deleteAdminById,
  patchAdminById
}
