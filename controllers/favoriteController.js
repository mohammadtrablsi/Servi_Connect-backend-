const asyncHandler = require("express-async-handler");
const {
  makeFavorite,
  Favorite,
} = require("../models/Favorite");
const {
    Expert,
  } = require("../models/Expert");
  


  /**
 *  @desc    make favorite
 *  @route   /api/favorite
 *  @method  get
 *  @access  private
 */
const getFavorite = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ user: req.user.id }).populate('expert');

    res.status(200).json({favorites:favorites});
});


/**
 *  @desc    make favorite
 *  @route   /api/favorite
 *  @method  POST
 *  @access  private
 */
const doFavorite = asyncHandler(async (req, res) => {
      let expert = await Expert.findOne({ _id:req.body.id });
      if (!expert) {
        return res.status(400).json({ message: "invalid expert" });
      }
    
  

  const favorite = new Favorite({
    user:req.user.id,
    expert:req.body.id,

  });

  const result = await favorite.save();
  res.status(200).json({"message":"success make favorite"});
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
  getFavorite,
  //getBookById,
  doFavorite,
  updateBook,
  deleteBook,
};
