const mongoose = require("mongoose");
const Joi = require("joi");

// Ads Schema
const AdsSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
  },
  { timestamps: true }
);



// Create the advertisement model
const Ads = mongoose.model("Ads", AdsSchema);

module.exports = { Ads };
