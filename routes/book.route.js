const Book = require("../models/book.model");
const BookController = require("../controllers//book.controller");
const express = require("express");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const router = express.Router();


router.post("" , extractFile, BookController.createBook);
router.get("",BookController.getBooks);
router.get("/download/:bookId",BookController.downloadBook);
router.get("/:cx",BookController.getBook);
router.put("/:id" , extractFile, BookController.updateBook);
router.delete("/:id", BookController.deleteBook);





module.exports = router;
