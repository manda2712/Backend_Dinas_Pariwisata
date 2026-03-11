const express = require("express");
const router = express.Router();
// const adminAuth = require('../middleware/adminAuth')
const superAdmin = require("../middleware/superAdminAuth");
const adminService = require("./user.service");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan Password wajib diisi" });
  }

  try {
    const admin = await adminService.login(username, password);
    res.status(200).json({ data: admin, message: "Login berhasil" });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

router.post("/insert", superAdmin, async (req, res) => {
  try {
    const user = req.body;
    const newUser = await adminService.insertAdmin(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/", superAdmin, async (req, res) => {
  try {
    const admin = await adminService.getAllAdmin();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const adminId = parseInt(req.params.id);
    const admin = await adminService.getAdminById(adminId);
    res.send(admin);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const adminId = parseInt(req.params.id);
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: "Tidak ada dtaa yang diubah" });
    }

    const updateAdmin = await adminService.patchAdminById(adminId, body);
    res.status(200).json({
      message: "Data berhasil diperbaharui",
      data: updateAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", superAdmin, async (req, res) => {
  try {
    const adminId = parseInt(req.params.id);
    await adminService.deleteAdminById(adminId);
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
