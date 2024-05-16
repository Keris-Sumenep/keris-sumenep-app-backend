const path = require("path");
const fs = require("fs");
const Benda = require("../models/benda");
const GambarBenda = require("../models/gambar_benda");

const getAllGambarBenda = async (req, res) => {
  try {
    const response = await GambarBenda.findAll({
      include: [
        {
          model: Benda,
        },
      ],
    });
    res.status(200).json({
      msg: "gambar benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getGambarBendaById = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await GambarBenda.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Benda,
        },
      ],
    });
    res.status(200).json({
      msg: "gambar benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const createGambarBenda = async (req, res) => {
  const { bendaId, judul } = req.body;
  const file = req.file ? req.file.filename : null;
  try {
    if (file == null) {
      return res.status(500).json({
        msg: {
          file: "upload gambar terlebih dahulu",
        },
      });
    }
    const data = {
      bendaId,
      judul,
      gambar: file,
    };
    await GambarBenda.create(data);
    res.status(201).json({
      msg: "gambar benda has been successfully created",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const updateGambarBenda = async (req, res) => {
  const { bendaId, judul } = req.body;
  const file = req.file ? req.file.filename : null;
  let { id } = req.params;
  try {
    const gambarBenda = await GambarBenda.findOne({
      where: {
        id: id,
      },
    });

    let fotoLama = gambarBenda.gambar;

    if (fotoLama && file) {
      const pathFile = path.join("./public/foto-benda", fotoLama);
      fs.unlinkSync(pathFile);
    }

    const data = {
      bendaId,
      judul,
    };

    if (file) {
      data.gambar = file;
    }

    await GambarBenda.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "gambar benda has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const deleteGambarBenda = async (req, res) => {
  let { id } = req.params;
  try {
    const gambarBenda = await GambarBenda.findOne({
      where: {
        id: id,
      },
    });

    let fotoLama = gambarBenda.gambar;

    if (fotoLama) {
      const pathFile = path.join("./public/foto-benda", fotoLama);
      fs.unlinkSync(pathFile);
    }

    await GambarBenda.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "gambar benda has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getAllGambarBenda,
  getGambarBendaById,
  createGambarBenda,
  updateGambarBenda,
  deleteGambarBenda,
};
