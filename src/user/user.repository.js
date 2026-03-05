const prisma = require('../db')

async function createAdmin (userData) {
  try {
    const newAdmin = await prisma.user.create({ data: userData })
    return newAdmin
  } catch (error) {
    console.error('error saat registrasi user:', error)
    throw new Error('failed to create user')
  }
}

async function findAdmin (username) {
  return await prisma.user.findFirst({
    where: {
      username: username
    }
  })
}

async function findAdminById (id) {
  const admin = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    },
    select: {
      id: true,
      username: true,
      nama_Lengkap: true,
      jenis_kelamin: true,
      role: true,
      password: true
    }
  })
  return admin
}

async function editAdminById (id, data) {
  try {
    const updatedAdmin = await prisma.user.update({
      where: { id: parseInt(id) },
      data: data,
      select: {
        id: true,
        username: true,
        nama_Lengkap: true,
        jenis_kelamin: true,
        role: true
      }
    })
    return updatedAdmin
  } catch (error) {
    console.error('Error saat update admin:', error)
    throw new Error('failed to update admin')
  }
}

async function deleteAdmin (id) {
  await prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  createAdmin,
  findAdmin,
  findAdminById,
  editAdminById,
  deleteAdmin
}
