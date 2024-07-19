const express = require("express");
const router = express.Router();
const { createExpert, searchExperts } = require("../controllers/expertController");
const multer = require("multer");
const path = require("path"); // Add this line
// Ensure the uploads directory exists
const fs = require('fs');


const ImagesDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(ImagesDir)) {
  fs.mkdirSync(ImagesDir);
}
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });

// /api/category
router.route("/").post(upload.single('profileImage'),createExpert).get(searchExperts);

module.exports = router;
