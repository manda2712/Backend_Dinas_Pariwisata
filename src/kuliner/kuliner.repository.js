const prisma = require("../db");

async function insertKuliner(kuliner) {
  const newKuliner = await prisma.kuliner.create({
    data: {
      nama_makanan: kuliner.nama_makanan,
      foto: kuliner.foto,
      deskripsi_id: kuliner.deskripsi_id,
      deskripsi_en: kuliner.deskripsi_en,
      lokasi: kuliner.lokasi,
    },
  });
  return newKuliner;
}

async function findKuliner() {
  const kuliner = await prisma.kuliner.findMany({
    select: {
      id: true,
      nama_makanan: true,
      lokasi: true,
      foto: true,
      deskripsi_id: true,
      deskripsi_en: true,
    },
  });
  return kuliner;
}

async function findKulinerById(id) {
  const kuliner = await prisma.kuliner.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return kuliner;
}

async function editKuliner(id, kuliner) {
  const updateKuliner = await prisma.kuliner.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nama_makanan: kuliner.nama_makanan,
      foto: kuliner.foto,
      ...( kuliner.deskripsi_id && { deskripsi_id: kuliner.deskripsi_id }),
      ...( kuliner.deskripsi_en && { deskripsi_en: kuliner.deskripsi_en }),
      lokasi: kuliner.lokasi

    },
  });
  return updateKuliner;
}

async function deleteKulinerById(id) {
  await prisma.kuliner.delete({
    where: { id: parseInt(id) },
  });
}

async function deleteAllKuliner() {
  return await prisma.kuliner.deleteMany({});
}

module.exports = {
  insertKuliner,
  findKuliner,
  findKulinerById,
  editKuliner,
  deleteAllKuliner,
  deleteKulinerById,
};
