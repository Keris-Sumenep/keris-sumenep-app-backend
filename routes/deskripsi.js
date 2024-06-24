var express = require("express");
const {
  getAllDeskripsi,
  getDeskripsiById,
  createDeskripsi,
  updateDeskripsi,
  deleteDeskripsi,
} = require("../controllers/deskripsiController");

var router = express.Router();

router.get("/", getAllDeskripsi);
router.get("/:id", getDeskripsiById);
router.post("/create", createDeskripsi);
router.patch("/update/:id", updateDeskripsi);
router.delete("/delete/:id", deleteDeskripsi);

module.exports = router;
