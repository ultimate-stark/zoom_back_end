const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const bookSchema = mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: Array, required: true },
  reviewers: {type: Array},
  publishers: { type: Array},
  publicationDate: { type: String },
  publicationCountry: { type: String },
  publicationCity: { type: String },
  edition: { type: String },
  parts: { type: String },
  papers: { type: String} ,  
  file:{ type: Array, required: true },  
  category:{ type: Array , required: true },
  subCategory:{ type: Array },
  subject:{ type: String },
  comments:{ type: String },
  coverImage:{ type: Array },
  sound:{ type: Array , es_indexed: false }
});


bookSchema.plugin(softDelete);

module.exports = mongoose.model("Book", bookSchema);


