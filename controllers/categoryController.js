const asyncHandler = require("express-async-handler");
const { Category, validateCreateCategory } = require("../models/Category");

/**
 *  @desc    Get all categories
 *  @route   /api/category
 *  @method  GET
 *  @access  public
 */
const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  console.log(categories);
  res.status(200).json({categories:categories});
});
/**
 *  @desc    Create new author
 *  @route   /api/authors
 *  @method  POST
 *  @access  private (only admin)
 */
const createCategory = asyncHandler(async (req, res) => {
    const { error } = validateCreateCategory(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const category = new Category({
        name: req.body.name,
    });
  
    const result = await category.save();
    res.status(201).json(result);
  });

 /**
 *  @desc    Search categories by name
 *  @route   /api/category/search?name=categoryName
 *  @method  GET
 *  @access  public 
 */
const searchCategories = asyncHandler(async (req, res) => {
  const { query } = req.query; // Use 'name' as the query parameter
  if (!query) {
    return res.status(400).json({ message: "Query parameter 'name' is required" });
  }

  const categories = await Category.find({
    name: new RegExp(query, 'i'), // Search for the name in a case-insensitive manner
  });

  res.status(200).json(categories);
});

module.exports = {
  getAllCategory,
  createCategory,
  searchCategories,
};
