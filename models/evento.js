const mongoose = require("mongoose");

// Esquema de las entradas (subdocumentos)
const entradaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    minlength: 3,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  disponibles: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "Las entradas disponibles deben ser un número entero",
    },
  },
});

// Esquema de los eventos
const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 5,
  },
  fecha: {
    type: Date,
    required: true,
  },
  entradas: [entradaSchema],
  recinto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recintos",
    required: true,
  },
});

// Modelo de eventos
const Evento = mongoose.model("eventos", eventoSchema, "eventos");

module.exports = Evento;
