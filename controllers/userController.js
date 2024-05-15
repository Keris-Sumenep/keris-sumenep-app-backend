const User = require("../models/user");

const getAllUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json({
      msg: "User data has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(200).json({
      msg: error.message,
    });
  }
};

module.exports = { getAllUser };
