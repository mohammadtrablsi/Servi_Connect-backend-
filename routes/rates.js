const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const {
 doRate,
 getAllExperts,
} = require("../controllers/rateController");

// // /api/books
router.route("/getAllExperts").get( getAllExperts);

// /api/favorite/:id
router
  .route("/:id")
  .post(verifyTokenAndAuthorization, doRate)

module.exports = router;
