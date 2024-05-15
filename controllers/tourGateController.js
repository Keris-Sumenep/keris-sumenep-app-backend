const TourGate = require("../models/tourGate");

const getAllTourGet = async (req, res) => {
  try {
    const tourGate = await TourGate.findAll();
    res.status(200).json({
      msg: "tour gate data has benn successfully loaded",
      payload: tourGate,
    });
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

const getTourGateById = async (req, res) => {
  let id = req.params.id;
  try {
    const tourGate = await TourGate.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "tour gate data has benn successfully loaded",
      payload: tourGate,
    });
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

const createTourGate = async (req, res) => {
  const { nama, gender, tahun_mulai, alamat } = req.body;
  let foto = req.file ? req.file.filename : null;
  try {
  } catch (error) {}
};

module.exports = { getAllTourGet, getTourGateById };
