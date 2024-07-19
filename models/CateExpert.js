const mongoose = require("mongoose");
const Joi = require("joi");

// CatExpert Scheama
const CatExpertSchema = new mongoose.Schema(
  {
    expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }]
  },
  { timestamps: true }
);

// CatExpert Model
const CatExpert = mongoose.model("CatExpert", CatExpertSchema);

// Validate Create CatExpert
function validateCreateCatExpert(obj) {
  const schema = Joi.object({
    expert: Joi.string().required(),
    category: Joi.array().items(Joi.string().required())
  });

  return schema.validate(obj);
}



module.exports = {
  validateCreateCatExpert,
  CatExpert,
};
