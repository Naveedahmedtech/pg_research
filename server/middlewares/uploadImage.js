const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagePath = path.join(__dirname, "../public/images");
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname}-${Date.now()}.${file.mimetype.split("/")[1]}`
    );
  },
});


const upload = multer({storage})

module.exports = upload;
