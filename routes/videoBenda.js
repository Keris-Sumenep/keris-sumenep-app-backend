var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const {
  getAllVideoBenda,
  getVideoBendaById,
  createVideoBenda,
  updateVideoBenda,
  deleteVideoBenda,
} = require("../controllers/videoBendaController");

// upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/video-benda");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

// file filter configuration
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mpeg" ||
    file.mimetype === "video/ogg" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/quicktime"
  ) {
    cb(null, true); // file diizinkan
  } else {
    cb(
      new Error(
        "File video harus berformat mp4, mpeg, ogg, webm, mkv, atau mov"
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // batas ukuran file 100MB
  fileFilter: fileFilter,
});

router.get("/", getAllVideoBenda);
router.get("/:id", getVideoBendaById);
router.post("/", upload.single("video"), createVideoBenda);
router.patch("/:id", upload.single("video"), updateVideoBenda);
router.delete("/:id", deleteVideoBenda);

module.exports = router;
