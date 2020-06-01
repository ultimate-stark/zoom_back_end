const Logo = require("../models/logo.model");

exports.createLogo = (req,res,next) => {
    console.log(req.files,"1")

  

  
    var logo = new Logo ({
        image:req.files[0].filename,
      
    });
  

  
    logo.save().then(createdBook => {
      console.log(createdBook)
      res.status(201).json({
        message:"book Added Successfully"
      })
    })
    .catch(error =>{
      res.status(500).json({
        message:"Creating a book failed"
      })
    })
  }


  exports.getLogo = (req,res,next) => {
    Logo.find().then(image => {
        console.log(image)
      res.status(200).json({
        message: "image Fetched Successfully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        image:image
      })
    }).catch(error => {
      res.status(500).json({
        message: "Fetching books Failed"
      })
    })
  }
  

// Logo.updateOne({ _id: req.params.id}, book)
// .then(result => {
//   // console.log(result)
//   if(result.n > 0){
//     res.status(200).json({
//       message: "Update Successful!"
//     });
//   } else {
//     res.status(401).json({message:"Not Authorized"})
//   }
// })
// .catch(error => {
//   res.status(500).json({
//     message:  "Couldn't Update book!"
//   })
// })
// }


