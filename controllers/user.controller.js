const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      name:req.body.name,
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}


exports.updateUser = (req,res,next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
  const user = new User({
    _id : req.body.id,
    name:req.body.name,
    email:req.body.email,
    password:hash
  })

User.updateOne({ _id: req.params.id}, user)
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
});
}


exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {

      if (!result) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 13600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}


exports.getUsers = (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery =User.find();
  let fetchedUsers;

  if(pageSize && currentPage) {
    userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  userQuery.then(documents => {
    fetchedUsers = documents;
    return User.count();
  }).then(count => {
    res.status(200).json({
      message: "users Fetched Successfully",
      users : fetchedUsers,
      maxUsers: count
    })
  }).catch(error => {
    res.status(500).json({
      message: "Fetching users Failed"
    })
  })
}

exports.getUser = (req,res,next) => {
  console.log(req.params.cx)
  User.findById(req.params.cx)
  .then(user => {
    if(user){
      res.status(200).json(user)
      // console.log(book,"egypt")
    } else {
      res.status(404).json({message:"user Not Found"})
    }
  })
  .catch(error => {
    res.status(500).json({
      message:"Fetching user Failed!!!"
    })
  })
}


exports.deleteUser = (req,res,next) => {
  console.log(req)
  User.deleteOne({ _id: req.params.id })
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


exports.getUser = (req,res,next) => {
  // console.log(req.params.cx)
  User.findById(req.params.cx)
  .then(user => {
    if(user){
      res.status(200).json(user)
      // console.log(book,"egypt")
    } else {
      res.status(404).json({message:"user Not Found"})
    }
  })
  .catch(error => {
    res.status(500).json({
      message:"Fetching user Failed!!!"
    })
  })
}