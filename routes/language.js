var express = require("express");
const {
  getAllLanguage,
  getLanguageByCode,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languageController");

var router = express.Router();

router.get("/", getAllLanguage);
router.get("/:code", getLanguageByCode);
router.post("/create", createLanguage);
router.patch("/update/:code", updateLanguage);
router.delete("/delete/:code", deleteLanguage);

module.exports = router;
