const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser, validateLogin } = require("../models/User");
const { Expert } = require("../models/Expert");
const path = require("path"); 

/**
 *  @desc    Register New User
 *  @route   /api/auth/register
 *  @method  POST
 *  @access  public
 */
module.exports.register = asyncHandler(async (req, res) => {
  // const { error } = validateRegisterUser(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "This user already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    phone: req.body.phone,
    profileImage: req.file ? path.basename(req.file.path) : null,
  });

  const result = await user.save();
  const token = user.generateToken();

  res.status(201).json(result);
});

/**
 *  @desc    Login User
 *  @route   /api/auth/login
 *  @method  POST
 *  @access  public
 */
module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user;
  let isUser = req.body.isUser;
  if (isUser) {
    user = await User.findOne({ email: req.body.email });
  } else {
    user = await Expert.findOne({ email: req.body.email });
  }

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = user.generateToken();

  res.status(200).json({ message: "Success", token: token, id: user.id });
});

/**
 *  @desc    Logout
 *  @route   /api/auth/logout
 *  @method  POST
 *  @access  public
 */
module.exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Success logout' });
});
