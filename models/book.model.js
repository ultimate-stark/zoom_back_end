const mongoose = require("mongoose");
const mongoosastic = require('mongoosastic');

const bookSchema = mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String},


  author: { type: String, required: true },
  reviewer: {type: String},
  publishers: { type: String},


  publicationDate: { type: String },
  publicationCountry: { type: String},
  publicationCity: { type: String},
  edition: { type: String},
  parts: { type: String },
  papers: { type: String},

  
  file:{ type:String , required:true},

  
  category:{ type: String, required: true },
  subCategory:{ type: String },
  subject:{ type: String },
  comments:{ type: String},
  coverImage:{ type: String, required: true},
  sound:{ type:Array , required:true ,es_indexed:false}
});


// bookSchema.plugin(mongoosastic,{  
//   host:"http://172.105.86.151/9900",
//   port: 9900,
//   protocol: "http",
//   auth: "cicd-man:72885HAEarrBadmQBWx3waYxn"

// });

// bookSchema.plugin(mongoosastic,{  
//   "host":"172.105.86.151",
//   "port": 9900
// });

module.exports = mongoose.model("Book", bookSchema);


