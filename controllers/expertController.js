const asyncHandler = require("express-async-handler");
const { Expert, validateRegisterExpert } = require("../models/Expert");
const bcrypt = require("bcryptjs");
const { CatExpert } = require("../models/CateExpert");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');


/**
 *  @desc    Create new author
 *  @route   /api/expert
 *  @method  POST
 *  @access  public 
 */
const createExpert = asyncHandler(async (req, res) => {
    // const { error } = validateRegisterExpert(req.body);
  
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }
    let user = await Expert.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "this user already registered" });
    }
    const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  
    const expert = new Expert({
        // name: req.body.name,
        email:req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    password: req.body.password,
    address: req.body.address,
    experence: req.body.experence,
    category:req.body.category,
    profileImage: req.file ? path.basename(req.file.path) : null,

    });
    const token = expert.generateToken();
    const result = await expert.save();
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      const categoryObjectIds = [];
      for (let i = 0; i < req.body.category.length; i++) {
          const categoryId = req.body.category[i];
          if (mongoose.Types.ObjectId.isValid(categoryId)) {
              categoryObjectIds.push(mongoose.Types.ObjectId(categoryId));
          } else {
              return res.status(400).json({ message: `Invalid category ID: ${categoryId}` });
          }
      }
  
      // Create CatExpert documents
      for (let i = 0; i < categoryObjectIds.length; i++) {
          const cateExpert = new CatExpert({
              expert: req.user.id,
              category: categoryObjectIds[i],
          });
          await cateExpert.save();
      }
   


  
   
   
    const { password, ...other } = result._doc;
  
    res.status(200).json({ message:'success', token:token });
  });
  


  /**
 *  @desc    Search experts by first name or last name
 *  @route   /api/expert?query=j
 *  @method  GET
 *  @access  public 
 */
const searchExperts = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  const experts = await Expert.find({
    $or: [
      { firstName: new RegExp(query, 'i') },
      { lastName: new RegExp(query, 'i') }
    ]
  }).select("-password");

  res.status(200).json({data:experts});
});




module.exports = {
  searchExperts,
  createExpert,
};
