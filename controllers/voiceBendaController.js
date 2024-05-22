const path = require("path");
const fs = require("fs");
const Benda = require("../models/benda");
const VoiceBenda = require("../models/voice_benda");

const getAllVoiceBenda = async (req, res) => {
  try {
    const response = await VoiceBenda.findAll({
      include: [
        {
          model: Benda,
        },
      ],
    });
    res.status(200).json({
      msg: "voice benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getVoiceBendaById = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await VoiceBenda.findOne({
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
      msg: "voice benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const createVoiceBenda = async (req, res) => {
  const { bendaId, judul } = req.body;
  const file = req.file ? req.file.filename : null;
  try {
    if (file == null) {
      return res.status(500).json({
        msg: {
          file: "upload voice terlebih dahulu",
        },
      });
    }
    const data = {
      bendaId,
      judul,
      voice: file,
    };
    await VoiceBenda.create(data);
    res.status(201).json({
      msg: "voice benda has been successfully created",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const updateVoiceBenda = async (req, res) => {
  const { bendaId, judul } = req.body;
  const file = req.file ? req.file.filename : null;
  let { id } = req.params;
  try {
    const VoiceBenda = await VoiceBenda.findOne({
      where: {
        id: id,
      },
    });

    let fotoLama = VoiceBenda.voice;

    if (fotoLama && file) {
      const pathFile = path.join("./public/foto-benda", fotoLama);
      fs.unlinkSync(pathFile);
    }

    const data = {
      bendaId,
      judul,
    };

    if (file) {
      data.voice = file;
    }

    await VoiceBenda.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "voice benda has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const deleteVoiceBenda = async (req, res) => {
  let { id } = req.params;
  try {
    const VoiceBenda = await VoiceBenda.findOne({
      where: {
        id: id,
      },
    });

    let fotoLama = VoiceBenda.voice;

    if (fotoLama) {
      const pathFile = path.join("./public/foto-benda", fotoLama);
      fs.unlinkSync(pathFile);
    }

    await VoiceBenda.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "voice benda has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getAllVoiceBenda,
  getVoiceBendaById,
  createVoiceBenda,
  updateVoiceBenda,
  deleteVoiceBenda,
};
