const express = require("express");
const {getProfile } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/",verifyToken,getProfile);


module.exports = router;
