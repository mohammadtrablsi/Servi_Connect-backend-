const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization,verifyToken } = require("../middlewares/verifyToken");
const {
 doMessage,
 getMessage,
 getUniqueUserMessages,
} = require("../controllers/messageController");

// // /api/books
// router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// /api/Message/:id
router
  .route("/")
  .post(verifyToken, doMessage).get(verifyToken,getMessage)

  router
  .route("/getUsers")
  .get(verifyToken,getUniqueUserMessages)

module.exports = router;
