var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const {
  getAllTourGet,
  getTourGateById,
  createTourGate,
  updateTourGate,
  deleteTourGate,
} = require("../controllers/tourGateController");

// upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/tour-gate");
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

router.get("/", getAllTourGet);
router.get("/:id", getTourGateById);
router.post("/create", upload.single("foto"), createTourGate);
router.patch("/update/:id", upload.single("foto"), updateTourGate);
router.delete("/delete/:id", deleteTourGate);

module.exports = router;
