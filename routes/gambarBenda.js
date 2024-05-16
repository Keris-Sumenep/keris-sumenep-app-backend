var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const {
  getAllGambarBenda,
  getGambarBendaById,
  createGambarBenda,
  updateGambarBenda,
  deleteGambarBenda,
} = require("../controllers/gambarBendaController");

// upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/foto-benda");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

// file filter configuration
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true); // file diizinkan
  } else {
    cb(new Error("File Gambar harus berformat jpg,jpeg,png,webp"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { files: 2000000 },
  fileFilter: fileFilter,
});

router.get("/", getAllGambarBenda);
router.get("/:id", getGambarBendaById);
router.post("/", upload.single("gambar"), createGambarBenda);
router.patch("/:id", upload.single("gambar"), updateGambarBenda);
router.delete("/:id", deleteGambarBenda);

module.exports = router;
