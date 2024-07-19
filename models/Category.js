const mongoose = require("mongoose");
const Joi = require("joi");

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
    },
  },
  //{ timestamps: true }
);

// Category Model
const Category = mongoose.model("Category", CategorySchema);

// Validate Create Category
function validateCreateCategory(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(250).required(),
  });

  return schema.validate(obj);
}


module.exports = {
  Category,
  validateCreateCategory,
};
