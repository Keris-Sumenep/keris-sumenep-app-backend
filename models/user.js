var { Sequelize } = require("sequelize");
const database = require("../config/database");

const { DataTypes } = Sequelize;

const User = database.define(
  "users",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
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
        len: {
          args: [8, 100],
          msg: "Nama minimal harus berisi 8 karakter",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email tidak tersedia",
      },
      validate: {
        notEmpty: {
          msg: "Email wajib diisi",
        },
        isEmail: {
          msg: "Format email salah",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password wajib diisi",
        },
        len: {
          args: [8, 100],
          msg: "Nama minimal harus berisi 8 karakter",
        },
      },
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
