const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "projects",
}; // Replace with your host

async function createDatabaseConnection() { //function to create the connection to the database
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = createDatabaseConnection; //export module
