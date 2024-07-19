const express = require("express");
const router = express.Router();
const { addCateExpert, getExpertByCategory } = require("../controllers/catExpertController");
const { verifyTokenAndAuthorization,verifyToken } = require("../middlewares/verifyToken");


router.route("/").post(addCateExpert).get(verifyToken,getExpertByCategory);
module.exports = router;
