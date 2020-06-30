const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
  name: {type: String},
  containers: {type: Array}
})

module.exports = mongoose.model("Publisher", publisherSchema);