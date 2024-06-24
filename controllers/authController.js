const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  const { nama, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      nama: nama,
      email: email,
      password: hashPassword,
    });

    return res.status(201).json({
      msg: "Register has been successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(500).json({
        msg: "Email / Password Salah",
      });
    }
    const userId = user.id;
    const uuid = user.uuid;
    const nama = user.nama;
    const email = user.email;
    const accessToken = jwt.sign(
      { userId, uuid, nama, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, uuid, nama },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) return res.sendStatus(401);
    const user = await User.findOne({
      where: {
        refresh_token: refresh_token,
      },
    });
    if (!user) return res.sendStatus(403);
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user.id;
        const uuid = user.uuid;
        const nama = user.nama;
        const email = user.email;

        const accessToken = jwt.sign(
          { userId, uuid, nama, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "20s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  const refresh_token = req.cookies.refreshToken;
  if (!refresh_token) return res.sendStatus(204);
  const user = await User.findOne({
    where: {
      refresh_token: refresh_token,
    },
  });
  if (!user) return res.sendStatus(204);
  const userId = user.id;
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};

module.exports = { register, login, refreshToken, logout };
