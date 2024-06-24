var express = require("express");
var router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const {
  getAllSetting,
  getSettingById,
  createSetting,
  updateSetting,
  deleteSetting,
} = require("../controllers/settingController");

// upload foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/setting");
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

router.get("/", getAllSetting);
router.get("/:id", getSettingById);
router.post(
  "/",
  upload.fields([
    { name: "logo_pens" },
    { name: "logo_aplikasi" },
    { name: "logo_pens_psdku" },
  ]),
  createSetting
);
router.patch(
  "/:id",
  upload.fields([
    { name: "logo_pens" },
    { name: "logo_aplikasi" },
    { name: "logo_pens_psdku" },
  ]),
  updateSetting
);
router.delete("/:id", deleteSetting);

module.exports = router;
