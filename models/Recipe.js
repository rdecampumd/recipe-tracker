const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    mealId: { type: String, required: true },
    name: String,
    category: String,
    area: String,
    thumbnail: String,
    note: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
