const asyncHandler = require("express-async-handler");
const {
  CatExpert,
  validateCreateCatExpert,
} = require("../models/CateExpert");

/**
 *  @desc    Get all books
 *  @route   /api/books
 *  @method  GET
 *  @access  public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }
  res.status(200).json(books);
});

/**
 *  @desc    Get book by id
 *  @route   /api/books/:id
 *  @method  GET
 *  @access  public
 */
const getExpertByCategory = asyncHandler(async (req, res) => {
  const cateExpert = await CatExpert.find({ category: req.body.id }).populate('expert');
  if (cateExpert) {
    res.status(200).json({data:cateExpert});
  } else {
    res.status(404).json({ message: "Not found" });
  }
});


/**
 *  @desc    Create new book
 *  @route   /api/books
 *  @method  POST
 *  @access  private (only admin)
 */
const addCateExpert = asyncHandler(async (req, res) => {
  const { error } = validateCreateCatExpert(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const catExpert = new CatExpert({
    expert:req.params.id,
    category:req.body.category,
  });

  const result = await catExpert.save();
  res.status(201).json(result);
});

/**
 *  @desc    Update a book
 *  @route   /api/books/:id
 *  @method  PUT
 *  @access  private (only admin)
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedBook);
});

/**
 *  @desc    Delete a book
 *  @route   /api/books/:id
 *  @method  DELETE
 *  @access  private (only admin)
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "book has been deleted" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});


module.exports = {
  getAllBooks,
  getExpertByCategory,
  addCateExpert,
  updateBook,
  deleteBook,
};
