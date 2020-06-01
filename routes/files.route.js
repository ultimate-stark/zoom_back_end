const express = require("express");
const extractFile = require("../middleware/file");
const filesController = require("../controllers/files.controller");
const router = express.Router();
var XLSX = require('xlsx');
const Book = require("../models/book.model");
var path       = require('path');
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

  var upload = multer({ storage: storage });
  router.post("" , upload.single('excel'), filesController.createBooks);


module.exports = router;
