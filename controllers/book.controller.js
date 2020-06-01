const Book = require("../models/book.model");



exports.createBook = (req,res,next) => {
  console.log(req)
  //  Book.createMapping((err, mapping) => {
  //  console.log('mapping created');
  // });
  // console.log(req);


  var paths = [];
  req.files.forEach(function(file){
    if(file.fieldname === "sound[]"){
      paths.push({audioName: file.originalname , audioSrc:file.path})
    }
  })

  var book = new Book ({
    type:req.body.type,
    title:req.body.title,
    author:req.body.author,
    reviewer:req.body.reviewer,
    publishers:req.body.publishers,
    publicationDate:req.body.publicationDate,
    publicationCountry:req.body.publicationCountry,
    publicationCity:req.body.publicationCity,
    edition:req.body.edition,
    parts:req.body.parts,
    papers:req.body.papers,
    file:req.body.file,
    category:req.body.category,
    subCategory:req.body.subCategory,
    subject:req.body.subject,
    comments:req.body.comments,
    coverImage:req.files[0].filename,
    sound:paths,
    
  });

 
book.on('es-indexed', (err, result) => {
  console.log(result)
  console.log('indexed to elastic search');
});

  book.save().then(createdBook => {
    console.log(createdBook)
    res.status(201).json({
      message:"book Added Successfully",
      book: {
        ...createdBook,
        id:createdBook._id
      }
    })
  })
  .catch(error =>{
    res.status(500).json({
      message:"Creating a book failed"
    })
  })
}


exports.downloadBook = (req,res,next)=>{
  // console.log("aaaaaaaaaaaaaaaaaaaaaa")
  Book.findById(req.params.bookId)
  .then(book => {
    if(book){
      console.log(book.image)
      const url = req.protocol + "://" + req.get("host");
      res.send({data: `${book.file}`})

    } else {
      res.status(404).json({message:"book Not Found"})
    }
  })
  .catch(error => {
    res.status(500).json({
      message:"Fetching book Failed!!!"
    })
  })
}


exports.updateBook = (req,res,next) => {
  console.log(req)


  const book = new Book({
    _id : req.body.id,
    type:req.body.type,
    title:req.body.title,
    author:req.body.author,
    reviewer:req.body.reviewer,
    publishers:req.body.publishers,
    publicationDate:req.body.publicationDate,
    publicationCountry:req.body.publicationCountry,
    publicationCity:req.body.publicationCity,
    edition:req.body.edition,
    parts:req.body.parts,
    papers:req.body.papers,
    file:req.body.file,
    category:req.body.category,
    subCategory:req.body.subCategory,
    subject:req.body.subject,
    comments:req.body.comments,
    coverImage:req.body.coverImage,
    sound:req.body.sound
  
   
  })

Book.updateOne({ _id: req.params.id}, book)
.then(result => {
  // console.log(result)
  if(result.n > 0){
    res.status(200).json({
      message: "Update Successful!"
    });
  } else {
    res.status(401).json({message:"Not Authorized"})
  }
})
.catch(error => {
  res.status(500).json({
    message:  "Couldn't Update book!"
  })
})
}



exports.getBooks = (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const bookQuery =Book.find();
  let fetchedBooks;

  if(pageSize && currentPage) {
    bookQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  bookQuery.then(documents => {
    fetchedBooks = documents;
    return Book.count();
  }).then(count => {
    res.status(200).json({
      message: "books Fetched Successfully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      books : fetchedBooks,
      maxBooks: count
    })
  }).catch(error => {
    res.status(500).json({
      message: "Fetching books Failed"
    })
  })
}




exports.getBook = (req,res,next) => {
  // console.log(req.params.cx)
  Book.findById(req.params.cx)
  .then(book => {
    if(book){
      res.status(200).json(book)
      // console.log(book,"egypt")
    } else {
      res.status(404).json({message:"book Not Found"})
    }
  })
  .catch(error => {
    res.status(500).json({
      message:"Fetching book Failed!!!"
    })
  })
}



exports.deleteBook = (req,res,next) => {
  Book.deleteOne({ _id: req.params.id })
  .then(result => {
    console.log(result)
    if(result.n > 0 ) {
      res.status(200).json({message:"Deletion Successful !"})
    }else{
      res.status(401).json({message : "Not Authorized"})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Deleting books Failed"
    })
  })
}
