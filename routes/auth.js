const express = require("express");
const { register, login,logout } = require("../controllers/authController");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const router = express.Router();
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
  
  // /api/auth/register
  router.post("/register", upload.single('profileImage'), register);

// /api/auth/login
router.post("/login", login);


router.post("/logout/:id",verifyTokenAndAuthorization,logout);

module.exports = router;
