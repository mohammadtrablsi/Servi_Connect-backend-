const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

// User Schema
const ExpertSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
      },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 200,
      },
      experence: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 1000,
      },
      category: {
        type: [String],
        required: true,
        trim: true,
      },
    // wallet: {
    //     type: Joi.number,
    // },
  },
  { timestamps: true }
);

// Generate Token
ExpertSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id, role:"expert" },process.env.JWT_SECRET_KEY);
}

// User Model
const Expert = mongoose.model("Expert", ExpertSchema);

// Validate Register Expert
function validateRegisterExpert(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    firstName: Joi.string().trim().min(5).max(100).required(),
    lastName: Joi.string().trim().min(5).max(100).required(),
    password: passwordComplexity().required(),
    address: Joi.string().trim().min(8).max(200).required(),
    experence: Joi.string().trim().min(8).max(1000).required(),
    category:Joi.array().items(Joi.string().trim().min(4).max(100)).required()
   // wallet: Joi.number().trim(),
  });
  return schema.validate(obj);
}

// // Validate Login User
// function validateLoginUser(obj) {
//   const schema = Joi.object({
//     email: Joi.string().trim().min(5).max(100).required().email(),
//     password: Joi.string().trim().min(6).required(),
//   });
//   return schema.validate(obj);
// }

// Validate Change Password
// function validateChangePassword(obj) {
//   const schema = Joi.object({
//     password: Joi.string().trim().min(6).required(),
//   });
//   return schema.validate(obj);
// }

// // Validate Update User
// function validateUpdateUser(obj) {
//   const schema = Joi.object({
//     email: Joi.string().trim().min(5).max(100).email(),
//     username: Joi.string().trim().min(2).max(200),
//     password: Joi.string().trim().min(6),
//   });
//   return schema.validate(obj);
// }

module.exports = {
    Expert,
  //validateLoginUser,
  validateRegisterExpert,
  //validateUpdateUser,
 // validateChangePassword
};
