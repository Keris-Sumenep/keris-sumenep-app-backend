var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");
const Language = require("./language");
const Benda = require("./benda");

const { DataTypes } = Sequelize;

const Deskripsi = database.define(
  "deskripsi",
  {
    bendaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "id benda wajib diisi",
      },
    },
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "id language wajib diisi",
      },
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Deskripsi wajib diisi",
        },
        len: {
          args: [8],
          msg: "Deskripsi minimal harus berisi 8 karakter",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Language.hasMany(Deskripsi);
Deskripsi.belongsTo(Language);
Benda.hasMany(Deskripsi);
Deskripsi.belongsTo(Benda);

module.exports = Deskripsi;
