const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  link: {type: String},
  order: {type: String},
  sizeInBytes: {type: String},
  type: {type: String},
})

module.exports = mongoose.model("File", fileSchema);