var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");

const { DataTypes } = Sequelize;

const Benda = database.define(
  "benda",
  {
    kode_benda: {
      type: DataTypes.STRING,
      defaultValue: uniqid,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama wajib diisi",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Benda;
