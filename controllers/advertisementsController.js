const asyncHandler = require("express-async-handler");
const {
  addAds,
  Ads,
} = require("../models/Advertisements");

/**
 *  @desc    Get all books
 *  @route   /api/books
 *  @method  GET
 *  @access  public
 */
const getAllAds = asyncHandler(async (req, res) => {
  let adss;
    adss = await Ads.find();
  res.status(200).json({ads:adss});
});



/**
 *  @desc    Get all ads
 *  @route   /api/books
 *  @method  post
 *  @access  public
 */
const makeAds = asyncHandler(async (req, res) => {


  // Create the advertisement with the file path
  const ads = new Ads({
    path: req.file.filename,
  });

  // Save the advertisement to the database
  const result = await ads.save();

  res.status(201).json({
    message:"success add ads"
  });
})


module.exports = {
  Ads,
  getAllAds,
  makeAds,
};
