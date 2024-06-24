var { Sequelize } = require("sequelize");
const database = require("../config/database");

const { DataTypes } = Sequelize;

const Setting = database.define(
  "setting",
  {
    nama_aplikasi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama wajib diisi",
        },
      },
    },
    logo_pens: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Logo Pens wajib diisi",
        },
      },
    },
    logo_aplikasi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Logo Aplikasi wajib diisi",
        },
      },
    },
    logo_pens_psdku: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Logo PENS PSDKU wajib diisi",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Setting;
