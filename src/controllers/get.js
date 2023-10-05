async function getProjects(connection) {
    try {
      const [rows] = await connection.query("SELECT * FROM projects");
      const projectsWithTechnologies = rows.map((project) => {
        project.technologies = project.technologies.split(",");
        return project;
      });
      return projectsWithTechnologies;
    } catch (error) {
      throw error;
    }
  }
  
  module.exports = { getProjects };
  