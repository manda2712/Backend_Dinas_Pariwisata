const prisma = require('../db')

async function createAdmin(userData) {
  try {

    const existingUser = await prisma.user.findUnique({
      where: {
        username: userData.username
      }
    })

    if (existingUser) {
      throw new Error("Username sudah digunakan")
    }

    const newAdmin = await prisma.user.create({
      data: userData
    })

    return newAdmin

  } catch (error) {
    console.error("error saat registrasi user:", error)
    throw error
  }
}

async function findAdmin (username) {
  return await prisma.user.findFirst({
    where: {
      username: username
    }
  })
}

async function findAllAdmin() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      nama_Lengkap: true,
      jenis_kelamin: true,
      role: true
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

async function editAdminById(id, data) {
  try {

    const existingUser = await prisma.user.findFirst({
      where: {
        username: data.username,
        NOT: { id: parseInt(id) } // agar user sendiri tidak dianggap duplikat
      }
    });

    if (existingUser) {
      throw new Error("Username sudah digunakan");
    }

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
    });

    return updatedAdmin;

  } catch (error) {
    console.error("Error saat update admin:", error);
    throw error;
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
  findAllAdmin,
  findAdminById,
  editAdminById,
  deleteAdmin
}
