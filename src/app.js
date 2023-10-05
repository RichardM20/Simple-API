// src/app.js
const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/config");
const routes = require("./routes/projects");
//---------------------------------------------------------------
const app = express();
app.use(cors());

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
}; //method to handle errors

(async () => {
  try {
    const connection = await dbConnection();

    app.use("/projects", routes(connection));

    app.use((req, res, next) => {
      const error = new Error("Ruta no encontrada ):");
      error.statusCode = 404;
      next(error);
    });
    app.use(errorHandler);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
