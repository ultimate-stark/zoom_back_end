const Book = require("../models/book.model");
const Author = require("../models/author.model");
const Publisher = require("../models/publisher.model");
const Reviewer = require("../models/reviewer.model");
const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");
const File = require("../models/file.model");
const S3 = require('aws-sdk/clients/s3');
const imageThumbnail = require('image-thumbnail');

const fs = require('fs')
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint('s3.us-west-1.wasabisys.com');
const request = require('request');


const accessKeyId = 'K43GG8YVVVTVKNHO0N05';
const secretAccessKey = 's8UFMXBaC0W0wyAndeAtn2UMzeyyGzeDgoFBzyyY';

const s3 = new S3({
  endpoint: wasabiEndpoint,
  region: 'us-west-1',
  accessKeyId,
  secretAccessKey
});


exports.createBook = (req, res, next) => {

  var paths = [];

  req.files.forEach(function (file) {
    if (file.fieldname === "sound[]") {
      request.get({ url: file.path, encoding: null }, function (err, res, data) {
        s3.putObject({
          Body: data,
          Bucket: "zoom-sounds",
          Key: file.originalname
        }
          , (err, data) => {
            if (err) {
              console.log(err);
            }
          });

      })
      paths.push({ audioName: file.originalname, audioSrc: file.path })
    }
  })

  var authors = JSON.parse(req.body.author)
  var reviewers = JSON.parse(req.body.reviewers)
  var publishers = JSON.parse(req.body.publishers)
  var category = JSON.parse(req.body.category)
  var subCategory = JSON.parse(req.body.subCategory)
  var files = JSON.parse(req.body.file)

  var order = 1;

  var newFiles = files.map(file => {
    return { link: file.link, order: order++, type: "", sizeInBytes: "" }
  })

  var book = new Book({
    type: req.body.type,
    title: req.body.title,
    authors,
    reviewers,
    publishers,
    publicationDate: req.body.publicationDate,
    publicationCountry: req.body.publicationCountry,
    publicationCity: req.body.publicationCity,
    edition: req.body.edition,
    parts: req.body.parts,
    papers: req.body.papers,
    subject: req.body.subject,
    comments: req.body.comments,
    category,
    subCategory,
    file: newFiles,
    subject: req.body.subject,
    sound: paths,
  });

  req.files.forEach(function (file) {
    if (file.fieldname === "coverImage") {
      fs.readFile(file.path, async function (err, contents) {
        s3.putObject({
          Body: contents,
          Bucket: "zoom-covers",
          Key: file.originalname
        }
          , (err, data) => {
            if (err) {
              console.log(err);
            }
          });
      });
      book.coverImage.push({ coverImageUrl: file.filename, thumbnailUrl: '' })
    }
  })

  let newBook = { title: book.title, _id: book._id }

  var update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  files.forEach(file => {
    File.findOneAndUpdate({ link: file.link, order: order++, type: "", sizeInBytes: "" }, update, options).then(data => {
      data.containers = newBook
      data.save()
    })
  })

  authors.forEach(author => {
    Author.findOneAndUpdate(author, update, options).then(data => {
      data.containers = newBook
      data.save()
    })
  })

  publishers.forEach(publisher => {
    Publisher.findOneAndUpdate(publisher, update, options).then(data => {
      data.containers = newBook
      data.save()
    })
  })

  reviewers.forEach(reviewer => {
    Reviewer.findOneAndUpdate(reviewer, update, options).then(data => {
      data.containers = newBook
      data.save()
    })
  })

  category.forEach(cat => {
    Category.findOneAndUpdate(cat, update, options).then(data => {
      data.containers = newBook
      data.save()
    })
  })

  subCategory.forEach(sub => {
    SubCategory.findOneAndUpdate(sub, update, options).then(data => {
      data.containers = newBook
      data.save()
    })
  })


  book.save().then(createdBook => {
    res.status(201).json({
      message: "book Added Successfully",
      book: {
        ...createdBook,
        id: createdBook._id
      }
    })
  })
    .catch(error => {
      res.status(500).json({
        message: "Creating a book failed"
      })
    })
}


exports.downloadBook = (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(book => {
      if (book) {
        console.log(book.image)
        const url = req.protocol + "://" + req.get("host");
        res.send({ data: `${book.file}` })

      } else {
        res.status(404).json({ message: "book Not Found" })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching book Failed!!!"
      })
    })
}


exports.updateBook = (req, res, next) => {
  console.log(req)


  const book = new Book({
    _id: req.body.id,
    type: req.body.type,
    title: req.body.title,
    author: req.body.author,
    reviewer: req.body.reviewer,
    publishers: req.body.publishers,
    publicationDate: req.body.publicationDate,
    publicationCountry: req.body.publicationCountry,
    publicationCity: req.body.publicationCity,
    edition: req.body.edition,
    parts: req.body.parts,
    papers: req.body.papers,
    file: req.body.file,
    category: req.body.category,
    subCategory: req.body.subCategory,
    subject: req.body.subject,
    comments: req.body.comments,
    coverImage: req.body.coverImage,
    sound: req.body.sound
  })

  Book.updateOne({ _id: req.params.id }, book)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Update Successful!"
        });
      } else {
        res.status(401).json({ message: "Not Authorized" })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't Update book!"
      })
    })
}



exports.getBooks = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const bookQuery = Book.find();
  let fetchedBooks;

  if (pageSize && currentPage) {
    bookQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  bookQuery.then(documents => {
    fetchedBooks = documents;
    return Book.count();
  }).then(count => {
    res.status(200).json({
      message: "books Fetched Successfully",
      books: fetchedBooks,
      maxBooks: count
    })
  }).catch(error => {
    res.status(500).json({
      message: "Fetching books Failed"
    })
  })
}

exports.getAuthors = (req, res) => {
  Author.find().then(authors => {
    res.status(200).json({
      authors,
    })
  });
}

exports.getPublishers = (req, res) => {
  Publisher.find().then(publishers => {
    res.status(200).json({
      publishers,
    })
  });
}

exports.getReviewers = (req, res) => {
  Publisher.find().then(reviewers => {
    res.status(200).json({
      reviewers,
    })
  });
}

exports.getCategories = (req, res) => {
  Category.find().then(categories => {
    res.status(200).json({
      categories,
    })
  });
}

exports.getSubCategories = (req, res) => {
  SubCategory.find().then(subCategories => {
    res.status(200).json({
      subCategories,
    })
  });
}

exports.getLinks = (req, res) => {
  File.find().then(links => {
    res.status(200).json({
      links,
    })
  });
}


exports.getBook = (req, res, next) => {
  let categories = []
  let related_books = []
  let related_papers = []
  let other_versions = []

  Book.findById(req.params.cx)
    .then(book => {
      if (book) {

        book.category.forEach(category => {
          if (!categories.some(i => i.title === category.title)) {
            categories.push(category)
          }
        })

        
        categories.forEach(category => {
          Book.find({ category: category, type: 'كتاب' , title: { $ne: book.title } }).then(docs => {
            docs.forEach(doc => related_books.push(doc))
            console.log(docs.length)
            Book.find({ category: category, type: 'مخطوطه' , title: { $ne: book.title } }).then(docs => {
              docs.forEach(doc => related_papers.push(doc))
              Book.find({title: book.title , edition: {$ne: book.edition}}).then(docs => {
                var other_versions = docs
                res.status(200).json({ book, related_books, related_papers , other_versions})
              })
            })
          })
        })

      } else {
        res.status(404).json({ message: "book Not Found" })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching book Failed!!!"
      })
    })
}



exports.deleteBook = (req, res, next) => {
  Book.removeOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion Successful !" })
      } else {
        res.status(401).json({ message: "Not Authorized" })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting books Failed"
      })
    })
}
