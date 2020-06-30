const mongoose = require("mongoose");


const logoSchema = mongoose.Schema({
  url:{ type: String, required: true}
})


module.exports = mongoose.model("Logo", logoSchema);
