const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  title: {type: String},
})

module.exports = mongoose.model("SubCategory", subCategorySchema);