const express = require("express");
const router = express.Router();

const Evento = require("../models/evento");

// GET /eventos
// Obtener todos los eventos con recinto y entradas
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.find().populate("recinto");

    if (eventos.length === 0) {
      return res.status(500).json({
        ok: false,
        error: "No se han encontrado eventos",
      });
    }

    res.status(200).json({
      ok: true,
      resultado: eventos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "No se han encontrado eventos",
    });
  }
});

// GET /eventos/localidad/:nombre
// Obtener eventos futuros de una localidad
router.get("/localidad/:nombre", async (req, res) => {
  try {
    const recintos = await require("../models/recinto").find({
      localidad: req.params.nombre,
    });

    const idsRecintos = recintos.map((recinto) => recinto._id);

    const eventos = await Evento.find({
      recinto: { $in: idsRecintos },
      fecha: { $gte: new Date() },
    }).populate("recinto");

    if (eventos.length === 0) {
      return res.status(404).json({
        ok: false,
        error: "No se han encontrado eventos",
      });
    }

    res.status(200).json({
      ok: true,
      resultado: eventos,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: "No se han encontrado eventos",
    });
  }
});

// GET /eventos/entradas/:idEvento/:tipoEntrada
// Consultar precio y disponibilidad de entradas
router.get("/entradas/:idEvento/:tipoEntrada", async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.idEvento);

    if (!evento) {
      throw new Error("Evento no encontrado");
    }

    const entrada = evento.entradas.find((entrada) => entrada.tipo === req.params.tipoEntrada);

    if (!entrada) {
      throw new Error("Tipo de entrada no encontrado");
    }

    res.status(200).json({
      ok: true,
      resultado: {
        precio: entrada.precio,
        disponibles: entrada.disponibles,
      },
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`,
    });
  }
});

// PUT /eventos/entradas/:idEvento/:tipoEntrada/:cantidad
// Descontar entradas disponibles
router.put("/entradas/:idEvento/:tipoEntrada/:cantidad", async (req, res) => {
  try {
    const cantidad = Number(req.params.cantidad);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("Cantidad no válida");
    }

    const evento = await Evento.findById(req.params.idEvento);

    if (!evento) {
      throw new Error("Evento no encontrado");
    }

    const entrada = evento.entradas.find((entrada) => entrada.tipo === req.params.tipoEntrada);

    if (!entrada || entrada.disponibles < cantidad) {
      throw new Error("No hay suficientes entradas");
    }

    entrada.disponibles -= cantidad;

    await evento.save();

    res.status(200).json({
      ok: true,
      resultado: evento,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error actualizando entradas del evento ${req.params.idEvento}`,
    });
  }
});

// GET /eventos/:id
// Obtener un evento por su ID
router.get("/:id", async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate("recinto");

    if (!evento) {
      return res.status(404).json({
        ok: false,
        error: `Evento ${req.params.id} no encontrado`,
      });
    }

    res.status(200).json({
      ok: true,
      resultado: evento,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Evento ${req.params.id} no encontrado`,
    });
  }
});

// POST /eventos
// Crear un evento
router.post("/", async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    const eventoGuardado = await nuevoEvento.save();

    res.status(201).json({
      ok: true,
      resultado: eventoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Error añadiendo evento",
    });
  }
});

// PUT /eventos/:id
// Actualizar un evento
router.put("/:id", async (req, res) => {
  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!eventoActualizado) {
      return res.status(404).json({
        ok: false,
        error: `Error actualizando evento ${req.params.id}`,
      });
    }

    res.status(200).json({
      ok: true,
      resultado: eventoActualizado,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error actualizando evento ${req.params.id}`,
    });
  }
});

// DELETE /eventos/:id
// Eliminar un evento
router.delete("/:id", async (req, res) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(req.params.id);

    if (!eventoEliminado) {
      return res.status(404).json({
        ok: false,
        error: `Error eliminando evento ${req.params.id}`,
      });
    }

    res.status(200).json({
      ok: true,
      resultado: eventoEliminado,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error eliminando evento ${req.params.id}`,
    });
  }
});

module.exports = router;
