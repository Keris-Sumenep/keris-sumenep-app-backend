var express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");
var router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
