const Benda = require("../models/benda");
const Deskripsi = require("../models/deskripsi");
const GambarBenda = require("../models/gambar_benda");
const Language = require("../models/language");
const VideoBenda = require("../models/video_benda");
const VoiceBenda = require("../models/voice_benda");

const getAllBenda = async (req, res) => {
  try {
    const response = await Benda.findAll({
      include: [
        {
          model: GambarBenda,
        },
        {
          model: VideoBenda,
        },
        {
          model: VoiceBenda,
          include: [
            {
              model: Language,
              include: [VoiceBenda],
            },
          ],
        },
        {
          model: Deskripsi,
          include: [
            {
              model: Language,
              include: [VoiceBenda],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      msg: "benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

const getBendaByCode = async (req, res) => {
  let code = req.params.code;
  try {
    const response = await Benda.findOne({
      where: {
        kode_benda: code,
      },
      include: [
        {
          model: GambarBenda,
        },
        {
          model: VideoBenda,
        },
        {
          model: VoiceBenda,
          include: [Language],
        },
        {
          model: Deskripsi,
          include: [Language],
        },
      ],
    });
    res.status(200).json({
      msg: "benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

const createBenda = async (req, res) => {
  const { nama } = req.body;
  try {
    const data = {
      nama,
    };

    await Benda.create(data);
    res.status(201).json({
      msg: "benda has been successfully created",
    });
  } catch (error) {
    // res.status(500).json({
    //   msg: error.message,
    // });
    console.log(error);
  }
};

const updateBenda = async (req, res) => {
  const { nama } = req.body;
  let code = req.params.code;
  try {
    const data = {
      nama,
    };
    await Benda.update(data, {
      where: {
        kode_benda: code,
      },
    });
    res.status(200).json({
      msg: "benda has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: "benda has been successfully updated",
    });
  }
};

const deleteBenda = async (req, res) => {
  let code = req.params.code;
  try {
    await Benda.destroy({
      where: {
        kode_benda: code,
      },
    });
    res.status(200).json({
      msg: "benda has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  getAllBenda,
  getBendaByCode,
  createBenda,
  updateBenda,
  deleteBenda,
};
