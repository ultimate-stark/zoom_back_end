const mongoose = require("mongoose");
const authorSchema = mongoose.Schema({
  name: {type: String},
  containers: {type: Array}
})
module.exports = mongoose.model("Author", authorSchema);