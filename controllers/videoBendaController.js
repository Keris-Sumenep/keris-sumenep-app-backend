const path = require("path");
const fs = require("fs");
const Benda = require("../models/benda");
const VideoBenda = require("../models/video_benda");

const getAllVideoBenda = async (req, res) => {
  try {
    const response = await VideoBenda.findAll({
      include: [
        {
          model: Benda,
        },
      ],
    });
    res.status(200).json({
      msg: "video benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getVideoBendaById = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await VideoBenda.findOne({
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
      msg: "video benda has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const createVideoBenda = async (req, res) => {
  const { bendaId, judul } = req.body;
  const file = req.file ? req.file.filename : null;
  try {
    if (file == null) {
      return res.status(500).json({
        msg: {
          file: "upload video terlebih dahulu",
        },
      });
    }
    const data = {
      bendaId,
      judul,
      video: file,
    };
    await VideoBenda.create(data);
    res.status(201).json({
      msg: "video benda has been successfully created",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const updateVideoBenda = async (req, res) => {
  const { bendaId, judul } = req.body;
  const file = req.file ? req.file.filename : null;
  let { id } = req.params;
  try {
    const response = await VideoBenda.findOne({
      where: {
        id: id,
      },
    });

    let videoLama = response.video;

    if (videoLama && file) {
      const pathFile = path.join("./public/video-benda", videoLama);
      fs.unlinkSync(pathFile);
    }

    const data = {
      bendaId,
      judul,
    };

    if (file) {
      data.video = file;
    }

    await VideoBenda.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "video benda has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const deleteVideoBenda = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await VideoBenda.findOne({
      where: {
        id: id,
      },
    });

    let videoLama = response.video;

    if (videoLama) {
      const pathFile = path.join("./public/video-benda", videoLama);
      fs.unlinkSync(pathFile);
    }

    await VideoBenda.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "video benda has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getAllVideoBenda,
  getVideoBendaById,
  createVideoBenda,
  updateVideoBenda,
  deleteVideoBenda,
};
