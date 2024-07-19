const mongoose = require("mongoose");
const Joi = require("joi");

// Rate Scheama
const RateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
    rate: {
        type:Number,
        required: true,
      },
  },
  { timestamps: true }
);

// Rate Model
const Rate = mongoose.model("Rate", RateSchema);

// Validate Create Rate
function makeRate(obj) {
  const schema = Joi.object({
    user: Joi.string().required(),
    expert: Joi.string().required(),
    rate:Joi.number().required(),
  });

  return schema.validate(obj);
}

// Validate Update Book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    author: Joi.string(),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0),
    cover: Joi.string().valid("soft cover", "hard cover"),
  });

  return schema.validate(obj);
}

module.exports = {
    Rate,
  makeRate,
  validateUpdateBook,
};
