var express = require("express");
const {
  getAllBenda,
  createBenda,
  getBendaByCode,
  updateBenda,
  deleteBenda,
} = require("../controllers/bendaController");
var router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");

router.get("/", getAllBenda);
router.get("/:code", getBendaByCode);
router.post("/create", createBenda);
router.patch("/update/:code", updateBenda);
router.delete("/delete/:code", deleteBenda);

module.exports = router;
