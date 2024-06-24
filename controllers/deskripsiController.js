const Benda = require("../models/benda");
const Deskripsi = require("../models/deskripsi");
const Language = require("../models/language");

const getAllDeskripsi = async (req, res) => {
  try {
    const response = await Deskripsi.findAll({
      include: [Benda, Language],
    });
    res.status(200).json({
      msg: "deskripsi has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getDeskripsiById = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await Deskripsi.findOne({
      where: {
        id: id,
      },
      include: [Benda, Language],
    });
    res.status(200).json({
      msg: "deskripsi has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const createDeskripsi = async (req, res) => {
  const { bendaId, deskripsi, languageId } = req.body;
  try {
    const data = {
      bendaId,
      languageId,
      deskripsi,
    };
    await Deskripsi.create(data);
    res.status(201).json({
      msg: "Deskripsi benda has been successfully created",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const updateDeskripsi = async (req, res) => {
  const { bendaId, languageId, deskripsi } = req.body;
  let { id } = req.params;
  try {
    const desk = await Deskripsi.findOne({
      where: {
        id: id,
      },
    });

    const data = {
      bendaId,
      languageId,
      deskripsi,
    };

    await Deskripsi.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "Deskripsi benda has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const deleteDeskripsi = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await Deskripsi.findOne({
      where: {
        id: id,
      },
    });

    await Deskripsi.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "Deskripsi benda has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getAllDeskripsi,
  getDeskripsiById,
  createDeskripsi,
  updateDeskripsi,
  deleteDeskripsi,
};
