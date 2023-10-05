// src/app.js
const express = require("express");
const cors = require("cors");
const createDatabaseConnection = require("./database/config");
const projectsRoutes = require("./routes/projects");

const app = express();
app.use(cors());

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
};

(async () => {
  try {
    const connection = await createDatabaseConnection();

    app.use("/projects", projectsRoutes(connection));

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
