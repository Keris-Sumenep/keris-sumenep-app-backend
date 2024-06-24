const Language = require("../models/language");

const getAllLanguage = async (req, res) => {
  try {
    const response = await Language.findAll();
    res.status(200).json({
      msg: "language has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

const getLanguageByCode = async (req, res) => {
  let code = req.params.code;
  try {
    const response = await Language.findOne({
      where: {
        kode_language: code,
      },
    });
    res.status(200).json({
      msg: "language has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.json(500).json({
      msg: error.message,
    });
  }
};

const createLanguage = async (req, res) => {
  const { bahasa } = req.body;
  try {
    const data = {
      bahasa,
    };

    await Language.create(data);
    res.status(201).json({
      msg: "language has been successfully created",
    });
  } catch (error) {
    // res.status(500).json({
    //   msg: error.message,
    // });
    console.log(error);
  }
};

const updateLanguage = async (req, res) => {
  const { bahasa } = req.body;
  let code = req.params.code;
  try {
    const data = {
      bahasa,
    };
    await Language.update(data, {
      where: {
        kode_Language: code,
      },
    });
    res.status(200).json({
      msg: "language has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: "language has been successfully updated",
    });
  }
};

const deleteLanguage = async (req, res) => {
  let code = req.params.code;
  try {
    await Language.destroy({
      where: {
        kode_Language: code,
      },
    });
    res.status(200).json({
      msg: "language has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  getAllLanguage,
  getLanguageByCode,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
