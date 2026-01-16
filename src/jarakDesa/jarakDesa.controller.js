const express = require("express");
const router = express.Router();
const jarakDesaService = require("./jarakDesa.service");

router.post("/insert", async (req, res) => {
  try {
    const newJarakDesas = {
      desaId: parseInt(req.body.desaId),
      titikKota: req.body.titikKota,
      jalur_laut: req.body.jalur_laut,
      jalur_darat: req.body.jalur_darat,
      jalur_udara: req.body.jalur_udara,
    };
    const newJarakDesa = await jarakDesaService.createJarakDesa(newJarakDesas);
    res.status(200).json(newJarakDesa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const jarakDesa = await jarakDesaService.getAllJarakDesa();

    const result = jarakDesa.map((item) => ({
      id: item.id,
      desaId: item.desaId,
      namaDesa: item.desa?.namaDesa, // 🔥 FLATTEN DI SINI
      titikKota: item.titikKota,
      jalur_laut: item.jalur_laut,
      jalur_darat: item.jalur_darat,
      jalur_udara: item.jalur_udara,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await jarakDesaService.getJarakDesaById(req.params.id);

    const result = {
      id: item.id,
      desaId: item.desaId,
      namaDesa: item.desa?.namaDesa,
      titikKota: item.titikKota,
      jalur_laut: item.jalur_laut,
      jalur_darat: item.jalur_darat,
      jalur_udara: item.jalur_udara,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const jarakDesaId = parseInt(req.params.id);
    const jarakDesa = {
      ...(req.body.desaId && { desaId: Number(req.body.desaId) }),
      ...(req.body.titikKota && { titikKota: req.body.titikKota }),
      ...(req.body.jalur_laut && { jalur_laut: req.body.jalur_laut }),
      ...(req.body.jalur_darat && { jalur_darat: req.body.jalur_darat }),
      ...(req.body.jalur_udara && { jalur_udara: req.body.jalur_udara }),
    };
    const updateJarakDesa = await jarakDesaService.udpateJarakDesa(
      jarakDesaId,
      jarakDesa
    );
    res.status(200).json(updateJarakDesa);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/all", async (req, res) => {
  try {
    await jarakDesaService.removeAllJarakDesa(req.params.id);
    res
      .status(200)
      .json({ message: "Semua daftar jalur wilayah berhasil dihapus" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const jarakDesa = req.params.id;
    await jarakDesaService.removeJarakDesaById(jarakDesa);
    res.status(200).json({ message: "Jalur Wialayah berhasil dihapus" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
