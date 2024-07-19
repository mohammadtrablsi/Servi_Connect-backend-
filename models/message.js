const mongoose = require("mongoose");
const Joi = require("joi");
const { text } = require("express");

// Message Scheama
const MessageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
    text:{
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

// Message Model
const Message = mongoose.model("Message", MessageSchema);

// Validate Create Message
function makeMessage(obj) {
  const schema = Joi.object({
    user: Joi.string().required(),
    expert: Joi.string().required(),
    text:Joi.string().trim().min(1).required(),
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
    Message,
  makeMessage,
  validateUpdateBook,
};
