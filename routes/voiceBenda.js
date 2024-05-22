var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const {
  getAllVoiceBenda,
  getVoiceBendaById,
  createVoiceBenda,
  updateVoiceBenda,
  deleteVoiceBenda,
} = require("../controllers/voiceBendaController");

// upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/voice-benda");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

// file filter configuration
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/ogg" ||
    file.mimetype === "audio/x-wav" ||
    file.mimetype === "audio/webm"
  ) {
    cb(null, true); // file diizinkan
  } else {
    cb(new Error("File audio harus berformat mp3, wav, ogg, atau webm"), false);
  }
};

// Konfigurasi multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // batas ukuran file 50MB
  fileFilter: fileFilter,
});

router.get("/", getAllVoiceBenda);
router.get("/:id", getVoiceBendaById);
router.post("/", upload.single("voice"), createVoiceBenda);
router.patch("/:id", upload.single("voice"), updateVoiceBenda);
router.delete("/:id", deleteVoiceBenda);

module.exports = router;
