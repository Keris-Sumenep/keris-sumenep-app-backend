var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");
const Benda = require("./benda");
const Language = require("./language");

const { DataTypes } = Sequelize;

const VoiceBenda = database.define(
  "voice_benda",
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
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "judul wajib diisi",
      },
    },
    voice: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "voice wajib diisi",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Language.hasMany(VoiceBenda);
VoiceBenda.belongsTo(Language);
Benda.hasMany(VoiceBenda);
VoiceBenda.belongsTo(Benda);

module.exports = VoiceBenda;
