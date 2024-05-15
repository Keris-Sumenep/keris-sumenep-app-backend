var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");
const Benda = require("./benda");

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
    voice_inggris: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "voice inggris wajib diisi",
      },
    },
    voice_madura: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "voice madura wajib diisi",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Benda.hasMany(VoiceBenda);
VoiceBenda.belongsTo(Benda);

module.exports = VoiceBenda;
