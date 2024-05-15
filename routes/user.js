var express = require("express");
const { getAllUser } = require("../controllers/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", getAllUser);

module.exports = router;
