const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
require("dotenv").config(); // Untuk membaca file .env

const prisma = new PrismaClient();

async function main() {
  // 1. Ambil password dari .env
  const rawPassword = process.env.SUPERADMIN_PASSWORD;

  if (!rawPassword) {
    throw new Error("Tolong set SUPERADMIN_PASSWORD di file .env Anda!");
  }

  // 2. Hash password-nya
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  console.log("Sedang membuat akun Super Admin...");

  // 3. Masukkan ke database menggunakan upsert
  const superAdmin = await prisma.user.upsert({
    where: { username: "superadminPariwisata" },
    update: {
      password: hashedPassword, 
    },
    create: {
      username: "superadminPariwisata",
      password: hashedPassword,
      nama_Lengkap: "Super Admin Dinas Pariwisata",
      jenis_kelamin: "Laki-laki",
      role: "superAdmin", 
    },
  })
  return superAdmin;
}

main()
  .catch((e) => {
    console.error("❌ Terjadi kesalahan saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
