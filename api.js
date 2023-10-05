const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//-------------------------------------------------
const app = express();
app.use(cors());

//configuracion para la conexion a la bd, en este caso mi localhost
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "projects",
};

//funcion para manejar errores
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
};

const startServer = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    app.get("/projects", async (req, res, next) => {
      try {
        const [rows] = await connection.query("SELECT * FROM projects");
        const projectsWithTechnologies = rows.map((project) => {
          project.technologies = project.technologies.split(",");
          return project;
        });
        res.json(projectsWithTechnologies);
      } catch (error) {
        next(error);
      }
    });

    app.use((req, res, next) => {
      const error = new Error("Ruta no encontrada ):");
      error.statusCode = 404;
      next(error);
    });

    app.use(errorHandler);

    app.listen(3000, () => {
      console.log("Servidor iniciado en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
