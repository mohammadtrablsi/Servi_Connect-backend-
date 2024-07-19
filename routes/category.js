const express = require("express");
const router = express.Router();
const { getAllCategory, createCategory, searchCategories } = require("../controllers/categoryController");

// /api/category
router.route("/").get(getAllCategory).post(createCategory);
router.route("/search").get(searchCategories)
module.exports = router;
