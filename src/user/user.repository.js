const prisma = require('../db')

async function createAdmin (admin) {
  try {
    const newAdmin = await prisma.admin.create({ data: admin })
    return newAdmin
  } catch (error) {
    console.error('error saat regsitrasi user:', error)
    throw new Error('failed to create user')
  }
}

async function findAdmin (username) {
  return await prisma.admin.findFirst({
    where: { username }
  })
}

async function findAdminById (id) {
  const admin = await prisma.admin.findUnique({
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
    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data,
      select: {
        id: true,
        username: true,
        nama_Lengkap: true,
        jenis_kelamin : true,
        role: true
      }
    })
    return updatedAdmin
  } catch (error) {
    console.error('Error saat update admin:', error)
    throw new Error('failed to update admin')
  }
}

module.exports = { createAdmin, findAdmin, findAdminById, editAdminById }
