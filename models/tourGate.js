var { Sequelize } = require("sequelize");
var uniqid = require("uniqid");
const database = require("../config/database");

const { DataTypes } = Sequelize;

const TourGate = database.define(
  "tour_gate",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama wajib diisi",
        },
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Foto wajib diisi",
        },
      },
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["male", "famale"],
      validate: {
        notEmpty: {
          msg: "Gender wajib diisi",
        },
      },
    },
    tahun_mulai: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Tahun mulai wajib diisi",
        },
      },
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Alamat mulai wajib diisi",
        },
      },
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["menikah", "belum menikah"],
      validate: {
        notEmpty: {
          msg: "Status mulai wajib diisi",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = TourGate;
