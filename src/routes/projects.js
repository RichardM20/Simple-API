const express = require("express");
const router = express.Router();
const { getProjects } = require("../controllers/get");
module.exports = (connection) => {
  router.get("/", async (req, res, next) => {
    try {
      const projects = await getProjects(connection);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
