var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");
const Benda = require("./benda");

const { DataTypes } = Sequelize;

const VideoBenda = database.define(
  "video_benda",
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
    video: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "video wajib diisi",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Benda.hasMany(VideoBenda);
VideoBenda.belongsTo(Benda);

module.exports = VideoBenda;
