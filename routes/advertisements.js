const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getAllAds,makeAds } = require("../controllers/advertisementsController");
const asyncHandler = require("express-async-handler");
const { Ads } = require("../models/Advertisements");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const upload = multer({ storage });

// Get all advertisements
router.route("/").get(getAllAds);

// Upload image and create advertisement
router.post("/", upload.single("image"), makeAds);

module.exports = router;
