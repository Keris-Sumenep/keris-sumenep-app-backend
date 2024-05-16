const path = require("path");
const fs = require("fs");
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
  const { nama, gender, tahun_mulai, alamat, status } = req.body;
  let foto = req.file ? req.file.filename : null;
  try {
    if (foto == null) {
      return res.status(500).json({
        msg: {
          file: "upload foto terlebih dahulu",
        },
      });
    }

    const data = {
      nama: nama,
      gender: gender,
      tahun_mulai: tahun_mulai,
      alamat: alamat,
      status: status,
      foto: foto,
    };

    await TourGate.create(data);
    res.status(201).json({
      msg: "tour gate has been successfully created",
    });
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

const updateTourGate = async (req, res) => {
  let id = req.params.id;
  const { nama, gender, tahun_mulai, alamat, status } = req.body;
  let foto = req.file ? req.file.filename : null;

  try {
    const tourGate = await TourGate.findOne({
      where: {
        id: id,
      },
    });

    let fotoLama = tourGate.foto;

    if (fotoLama && foto) {
      const pathFile = path.join("./public/tour-gate", fotoLama);
      fs.unlinkSync(pathFile);
    }

    const data = {
      nama: nama,
      gender: gender,
      tahun_mulai: tahun_mulai,
      alamat: alamat,
      status: status,
    };

    if (foto) {
      data.foto = foto;
    }

    await TourGate.update(data, {
      where: {
        id: tourGate.id,
      },
    });

    return res.status(200).json({
      msg: "updated tour gate has been successfully",
    });
  } catch (error) {
    return res.json(500).json({
      msg: error,
    });
  }
};

const deleteTourGate = async (req, res) => {
  let id = req.params.id;
  try {
    const tourGate = await TourGate.findOne({
      where: {
        id: id,
      },
    });

    let fotoLama = tourGate.foto;

    if (fotoLama) {
      const pathFile = path.join("./public/tour-gate", fotoLama);
      fs.unlinkSync(pathFile);
    }
    try {
      await TourGate.destroy({
        where: {
          id: tourGate.id,
        },
      });
      return res.status(200).json({
        msg: "deleted tour gate has been successfully",
      });
    } catch (error) {
      res.json(400).json({
        msg: error.message,
      });
    }
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  getAllTourGet,
  getTourGateById,
  createTourGate,
  updateTourGate,
  deleteTourGate,
};
