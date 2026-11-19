const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Crear aplicación Express
const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Cargar enrutadores
const rutasRecintos = require("./routes/recintos");
const rutasEventos = require("./routes/eventos");

// Registrar rutas
app.use("/recintos", rutasRecintos);
app.use("/eventos", rutasEventos);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Conectar con MongoDB y arrancar servidor
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conexión con MongoDB establecida correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando con MongoDB:", error.message);
    process.exit(1);
  });
