var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");
const Benda = require("./benda");

const { DataTypes } = Sequelize;

const MaintananceBenda = database.define(
  "maintanance_benda",
  {
    bendaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "id benda wajib diisi",
      },
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: "deskripsi wajib diisi",
      },
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["baik", "rusak"],
      validate: {
        notEmpty: "status wajib diisi",
      },
    },
    bukti: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "bukti wajib diisi",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Benda.hasMany(MaintananceBenda);
MaintananceBenda.belongsTo(Benda);

module.exports = MaintananceBenda;
