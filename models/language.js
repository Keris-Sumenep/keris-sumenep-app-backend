var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");

const { DataTypes } = Sequelize;

const Language = database.define(
  "language",
  {
    kode_language: {
      type: DataTypes.STRING,
      defaultValue: uniqid,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bahasa: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "bahasa wajib diisi",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Language;
