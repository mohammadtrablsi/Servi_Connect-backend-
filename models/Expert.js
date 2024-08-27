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
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
      },
      experence: {
        type: String,
        required: true,
        trim: true,
      },
      category: {
        type: [String],
        required: true,
        trim: true,
      },
      profileImage:{
        type: String,
        required: true,
        trim: true,
      }
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
    email: Joi.string().trim().required().email(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    password: Joi.required(),
    address: Joi.string().trim().required(),
    experence: Joi.string().trim().required(),
    category:Joi.array().items(Joi.string()).required(),
    profileImage:Joi.required()
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
