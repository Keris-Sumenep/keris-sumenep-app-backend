var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");
const Benda = require("./benda");

const { DataTypes } = Sequelize;

const GambarBenda = database.define(
  "gambar_benda",
  {
    bendaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "id benda wajib diisi",
      },
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "judul wajib diisi",
      },
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "gambar wajib diisi",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Benda.hasMany(GambarBenda);
GambarBenda.belongsTo(Benda);

module.exports = GambarBenda;
