const Book = require("../models/book.model");
var AdmZip = require('adm-zip');
// var unzipper = require('unzipper');
var XLSX = require('xlsx');
var path = require('path');
const multer = require("multer");
const request = require('request');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint('s3.us-west-1.wasabisys.com');
const accessKeyId = 'K43GG8YVVVTVKNHO0N05';
const secretAccessKey = 's8UFMXBaC0W0wyAndeAtn2UMzeyyGzeDgoFBzyyY';
const s3 = new S3({
  endpoint: wasabiEndpoint,
  region: 'us-west-1',
  accessKeyId,
  secretAccessKey
});


exports.createBooks = (req, res, next) => {
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  var books = []
  sheet_namelist.forEach((element, i) => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[i]]);
    if (xlData.length) {
      if (element === 'books') {
        books = JSON.parse(JSON.stringify(xlData));
        books.forEach(item => {
          item.authors = []
          item.publishers = []
          item.reviewers = []
          item.category = []
          item.subCategory = []
          item.file = []
        })
        xlData.forEach((col, i) => {
          books[i].authors.push({ name: col.author })
          books[i].publishers.push({ name: col.publisher })
          books[i].reviewers.push({ name: col.reviewer })
          books[i].category.push({ title: col.category })
          books[i].subCategory.push({ title: col.subCategory })
          if (col.fileName) {
            books[i].file.push({ link: col.file, name: col.fileName.split('.')[0] + '.' + 'pdf' })
            books[i].file.push({ link: 'https://zoom-books.s3.us-west-1.wasabisys.com/' + col.fileName })
          }

          if (col.file) {
            request({ url: col.file, encoding: null }, function (err, res, contents) {
              var fileName;
              fs.writeFile(path.join(__dirname, `../images/${col.fileName}`), contents, function () {

                var zip = new AdmZip(path.join(__dirname, `../images/${col.fileName}`));
                var zipEntries = zip.getEntries();

                zipEntries.forEach(function (zipEntry) {
                  fileName = zipEntry.entryName;
                });

                var zip = new AdmZip(path.join(__dirname, `../images/${col.fileName}`));

                zip.extractAllTo(path.join(__dirname, `../images`), true);

                var extension = fileName.split('.')[col.fileName.split('.').length - 1]

                var newFileName = col.fileName.split('.')[0] + '.' + extension

                fs.renameSync(path.join(__dirname, `../images/${fileName}`), path.join(__dirname, `../images/${newFileName}`))

                s3.putObject({
                  Body: contents,
                  Bucket: "zoom-books",
                  Key: col.fileName
                }).promise();

              })

            });
          }
        })
      }
      else if (element === 'sounds') {
        books.forEach(item => {
          item.sound = []
        })
        xlData.forEach((col, i) => {
          var record = books.find(i => i.id === col.book_id)
          record.sound.push({ audioName: col.name, audioSrc: col.src })
          request.get({ url: col.path, encoding: null }, function (err, res, data) {
            s3.putObject({
              Body: data,
              Bucket: "zoom-sounds",
              Key: col.name
            }
              , (err, data) => {
                if (err) {
                  console.log(err);
                }
              });

          }).pipe(fs.createWriteStream(path.join(__dirname, `../images/${col.name}`)))
        })
      }
      else if (element === 'covers') {
        books.forEach(item => {
          item.coverImage = []
        })
        xlData.forEach((col, i) => {
          books[i].coverImage.push({ coverImageUrl: col.coverImage, thumbnailUrl: '' })
          request.get({ url: col.url, encoding: "binary" }, (error, res, body) => {
            fs.writeFile(path.join(__dirname, `../images/${col.title}.png`), body, 'binary', function (err) {
              if (err)
                console.log(err);
              else {
                s3.putObject({
                  Body: body,
                  Bucket: "zoom-covers",
                  Key: col.coverImage
                }
                  , (err, data) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                console.log("The file was saved!")
              }
            });

          })
        })
      }
    }
  });
  Book.insertMany(books).then(createdBook => {
    res.status(201).json({
      message: "books added successfully"
    })
  }).catch(error => {
    res.status(500).json({
      message: "Creating a book failed"
    })
  })
}