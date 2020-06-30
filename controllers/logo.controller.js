const Logo = require("../models/logo.model");

exports.createLogo = (req, res, next) => {
  Logo.find().then(logos => {
    if(logos.length) {
      Logo.findOne().then(logo => {
        logo.url = req.files[0].filename
        logo.save().then(createdBook => {
          res.status(201).json({
            message: "تم تغير صورة الموقع بنجاح"
          })
        }).catch(error => {
          res.status(500).json({
            message: "Creating a book failed"
          })
        })
      })
    }
    else {
      var newLogo = new Logo({
        url: req.files[0].filename,
      });
      newLogo.save().then(createdBook => {
        res.status(201).json({
          message: "تم تغير صورة الموقع بنجاح"
        })
      }).catch(error => {
        res.status(500).json({
          message: "Creating a book failed"
        })
      })
    }
  })
}


exports.getLogo = (req, res, next) => {
  Logo.find().then(logo => {
    if(logo.length){
      res.status(200).json({
        logo: logo[0].url
      })
    }
    else {
      res.status(200).json({
        message: 'no logos'
      })
    }
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


