const path = require("path");
const fs = require("fs");
const Benda = require("../models/benda");
const Setting = require("../models/setting");

const getAllSetting = async (req, res) => {
  try {
    const response = await Setting.findAll();
    res.status(200).json({
      msg: "settings has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getSettingById = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await Setting.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "setting has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const createSetting = async (req, res) => {
  const { nama_aplikasi } = req.body;
  const logo_pens = req.files ? req.files.logo_pens[0].filename : null;
  const logo_aplikasi = req.files ? req.files.logo_aplikasi[0].filename : null;
  const logo_pens_psdku = req.files
    ? req.files.logo_pens_psdku[0].filename
    : null;
  try {
    if (logo_pens == null || logo_aplikasi == null || logo_pens_psdku == null) {
      return res.status(500).json({
        msg: {
          file: "upload gambar terlebih dahulu",
        },
      });
    }
    let data = {
      nama_aplikasi,
      logo_aplikasi,
      logo_pens,
      logo_pens_psdku,
    };
    await Setting.create(data);
    res.status(201).json({
      msg: "Setting has been successfully created",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const updateSetting = async (req, res) => {
  const { nama_aplikasi } = req.body;
  const logo_pens =
    req.files && req.files.logo_pens ? req.files.logo_pens[0].filename : null;
  const logo_aplikasi =
    req.files && req.files.logo_aplikasi
      ? req.files.logo_aplikasi[0].filename
      : null;
  const logo_pens_psdku =
    req.files && req.files.logo_pens_psdku
      ? req.files.logo_pens_psdku[0].filename
      : null;
  let { id } = req.params;
  try {
    const setting = await Setting.findOne({
      where: {
        id: id,
      },
    });

    let logoAplikasiLama = setting.logo_aplikasi;
    let logoPensLama = setting.logo_pens;
    let logoPsdkuLama = setting.logo_pens_psdku;

    if (logoAplikasiLama && logo_aplikasi) {
      const pathFile = path.join("./public/setting", logoAplikasiLama);
      fs.unlinkSync(pathFile);
    }

    if (logoPensLama && logo_pens) {
      const pathFile = path.join("./public/setting", logoPensLama);
      fs.unlinkSync(pathFile);
    }

    if (logoPsdkuLama && logo_pens_psdku) {
      const pathFile = path.join("./public/setting", logoPsdkuLama);
      fs.unlinkSync(pathFile);
    }

    let data = {
      nama_aplikasi,
    };

    if (logo_aplikasi) {
      data.logo_aplikasi = logo_aplikasi;
    }

    if (logo_pens) {
      data.logo_pens = logo_pens;
    }

    if (logo_pens_psdku) {
      data.logo_pens_psdku = logo_pens_psdku;
    }

    await Setting.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "setting has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const deleteSetting = async (req, res) => {
  let { id } = req.params;
  try {
    const setting = await Setting.findOne({
      where: {
        id: id,
      },
    });

    let logoAplikasiLama = setting.logo_aplikasi;
    let logoPensLama = setting.logo_pens;
    let logoPsdkuLama = setting.logo_pens_psdku;

    if (logoAplikasiLama) {
      const pathFile = path.join("./public/setting", logoAplikasiLama);
      fs.unlinkSync(pathFile);
    }

    if (logoPensLama) {
      const pathFile = path.join("./public/setting", logoPensLama);
      fs.unlinkSync(pathFile);
    }

    if (logoPsdkuLama) {
      const pathFile = path.join("./public/setting", logoPsdkuLama);
      fs.unlinkSync(pathFile);
    }

    await Setting.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      msg: "setting has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getAllSetting,
  getSettingById,
  createSetting,
  updateSetting,
  deleteSetting,
};
