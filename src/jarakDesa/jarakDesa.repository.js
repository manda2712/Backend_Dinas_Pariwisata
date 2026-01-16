const prisma = require('../db')

async function insertJarak (jarakDesa) {
  const newJarakDesa = await prisma.jarakDesa.create({
    data: {
      desaId: jarakDesa.desaId,
      titikKota: jarakDesa.titikKota,
      jalur_laut: jarakDesa.jalur_laut,
      jalur_darat: jarakDesa.jalur_darat,
      jalur_udara: jarakDesa.jalur_udara
    },
    include: {
      desa: {
        select: {
          namaDesa: true
        }
      }
    }
  })
  return newJarakDesa
}

async function findJarak () {
  const jarakDesa = await prisma.jarakDesa.findMany({
    select: {
      id: true,
      desaId: true,
      desa: {
        select: {
          namaDesa: true
        }
      },
      titikKota: true,
      jalur_laut: true,
      jalur_darat: true,
      jalur_udara: true
    }
  })
  return jarakDesa
}

async function findJarakById (id) {
  const jarakDesa = await prisma.jarakDesa.findUnique({
    where: {
      id: parseInt(id)
    },
    select: {
      id: true,
      desaId: true,
      desa: {
        select: {
          namaDesa: true
        }
      },
      titikKota: true,
      jalur_laut: true,
      jalur_darat: true,
      jalur_udara: true
    }
  })
  return jarakDesa
}

async function editJarakDesa (id, jarakDesa) {
  const updateJarakDesa = await prisma.jarakDesa.update({
    where: {
      id: parseInt(id)
    },
    data: {
      desaId: jarakDesa.desaId,
      titikKota: jarakDesa.titikKota,
      jalur_laut: jarakDesa.jalur_laut,
      jalur_darat: jarakDesa.jalur_darat,
      jalur_udara: jarakDesa.jalur_udara
    }
  })
  return updateJarakDesa
}

async function deleteJarakDesaById (id) {
  await prisma.jarakDesa.delete({
    where: { id: parseInt(id) }
  })
}

async function deleteAllJarakDesa () {
  return await prisma.jarakDesa.deleteMany({})
}

module.exports = {
  insertJarak,
  findJarak,
  findJarakById,
  editJarakDesa,
  deleteAllJarakDesa,
  deleteJarakDesaById
}
