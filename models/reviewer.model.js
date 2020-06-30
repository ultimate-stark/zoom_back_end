const mongoose = require("mongoose");

const reviewerSchema = mongoose.Schema({
  name: { type: String},
  containers: { type: Array}
});

module.exports = mongoose.model("Reviewer", reviewerSchema);