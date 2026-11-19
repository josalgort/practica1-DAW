const mongoose = require("mongoose");

// Esquema de los recintos
const recintoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 5,
  },
  direccion: {
    type: String,
    required: true,
    minlength: 10,
  },
  localidad: {
    type: String,
    required: true,
    minlength: 3,
  },
  aforoMaximo: {
    type: Number,
  },
});

// Modelo de recintos
const Recinto = mongoose.model("recintos", recintoSchema, "recintos");

module.exports = Recinto;
