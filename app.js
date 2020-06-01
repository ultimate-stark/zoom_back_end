const elasticsearch = require('elasticsearch');
const Book = require("./models/book.model");
const booksRoutes = require("./routes/book.route");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const elasticRoutes = require('./routes/elastic.route')
const userRoutes = require("./routes/user.route");
const filesRoutes = require('./routes/files.route');
const logoRoutes = require('./routes/logo.route');
const app = express();

let isDBConnect = false;

mongoose.connect("mongodb+srv://Khattab:" +process.env.MONGO_ATLAS_PW +"@cluster0-amjzm.mongodb.net/test",      
{ useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
    isDBConnect = true;
    console.log("Connected to database!");
  })
  .catch(() => {
    isDBConnect = false;
    console.log("Connection failed!");
  });
 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");



  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});









mongoose.set('useCreateIndex', true);

app.use("/api/books", booksRoutes);
app.use("/api/files", filesRoutes);


// app.use("/api/elastic", elasticRoutes);
app.use("/api/user", userRoutes);
app.use("/api/logo", logoRoutes);

module.exports = app;
