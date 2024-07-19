const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization,verifyToken } = require("../middlewares/verifyToken");
const {
 doFavorite,
 getFavorite,
} = require("../controllers/favoriteController");

// // /api/books
// router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// /api/favorite/:id
router
  .route("/")
  .post(verifyToken, doFavorite).get(verifyToken,getFavorite)

module.exports = router;
