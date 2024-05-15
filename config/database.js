const { Sequelize } = require("sequelize");

const db = new Sequelize("db_kerissumenep", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
