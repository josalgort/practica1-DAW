const express = require("express");
const router = express.Router();

const Recinto = require("../models/recinto");

// GET /recintos
// Obtener todos los recintos
router.get("/", async (req, res) => {
  try {
    const recintos = await Recinto.find();

    if (recintos.length === 0) {
      return res.status(500).json({
        ok: false,
        error: "No se han encontrado recintos",
      });
    }

    res.status(200).json({
      ok: true,
      resultado: recintos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "No se han encontrado recintos",
    });
  }
});

// GET /recintos/:id
// Obtener un recinto por su ID
router.get("/:id", async (req, res) => {
  try {
    const recinto = await Recinto.findById(req.params.id);

    if (!recinto) {
      return res.status(404).json({
        ok: false,
        error: `Recinto ${req.params.id} no encontrado`,
      });
    }

    res.status(200).json({
      ok: true,
      resultado: recinto,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Recinto ${req.params.id} no encontrado`,
    });
  }
});

// GET /recintos/localidad/:nombre
// Obtener recintos por localidad
router.get("/localidad/:nombre", async (req, res) => {
  try {
    const recintos = await Recinto.find({
      localidad: req.params.nombre,
    });

    if (recintos.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "No se han encontrado recintos de la localidad indicada",
      });
    }

    res.status(200).json({
      ok: true,
      resultado: recintos,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: "No se han encontrado recintos de la localidad indicada",
    });
  }
});

// POST /recintos
// Crear un recinto
router.post("/", async (req, res) => {
  try {
    const nuevoRecinto = new Recinto(req.body);
    const recintoGuardado = await nuevoRecinto.save();

    res.status(201).json({
      ok: true,
      resultado: recintoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Error añadiendo recinto",
    });
  }
});

// DELETE /recintos/:id
// Eliminar un recinto por su ID
router.delete("/:id", async (req, res) => {
  try {
    const recintoEliminado = await Recinto.findByIdAndDelete(req.params.id);

    if (!recintoEliminado) {
      return res.status(404).json({
        ok: false,
        error: `Error eliminando recinto ${req.params.id}`,
      });
    }

    res.status(200).json({
      ok: true,
      resultado: recintoEliminado,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error eliminando recinto ${req.params.id}`,
    });
  }
});

module.exports = router;
