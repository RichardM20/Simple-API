const mysql = require("mysql2/promise");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "projects",
};

async function createDatabaseConnection() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = createDatabaseConnection;
