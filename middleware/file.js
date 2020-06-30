const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf":"pdf",
  "audio/mpeg":"mpeg",
  "video/mp4":"mp4",
  "audio/mpeg":"mpeg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+"-"+Date.now()+"."+ext);
  }
});

module.exports = multer({ storage: storage }).any();


