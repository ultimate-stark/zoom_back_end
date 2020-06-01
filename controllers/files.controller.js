const Book = require("../models/book.model");
var XLSX = require('xlsx');
var path       = require('path');
const multer = require("multer");
const request = require('request');
const fs  = require('fs');

exports.createBooks = (req,res,next) => {
    console.log(req.file)
    var workbook =  XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x=0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        console.table(xlData)
        xlData.forEach(col => {
          request.get({url:col.url,encoding:"binary"} , (error ,res,body) => {
            
            var strArr = col.coverImage.split('.')
            fs.writeFile(path.join(__dirname ,`../images/${col.title}.png`)  , body, 'binary', function(err) {
              if(err)
                console.log(err);
              else
                console.log("The file was saved!")
            }); 
          
          })
          eval(col.audio).forEach(function (audio) {
            request.get({ url: audio.path })
            .pipe(fs.createWriteStream(path.join(__dirname, `../images/${audio.name}`)))
            })
        })
        for(let i in xlData){
          xlData[i].sound = eval(xlData[i].sound)
          
        }
        
        Book.insertMany(xlData).then(createdBook => {
            console.log(createdBook,"aaaaaaaaaaaaaa")
            res.status(201).json({
              message:"books added successfully"
            })
          }).catch(error =>{
            res.status(500).json({
              message:"Creating a book failed"
            })
          })
        x++;
    });
}