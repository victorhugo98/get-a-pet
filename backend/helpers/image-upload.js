const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    let folder = "";

    if (req.baseUrl.includes("user")) folder = "users";
    if (req.baseUrl.includes("pet")) folder = "pets";

    callback(null, `public/images/${folder}`);
  },
  filename: function (req, file, callback) {
    callback(
      null,
      `${Date.now() * Math.round(Math.random() * 100)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: function (req, file, callback) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      callback(new Error("Apenas png ou jpg."));
    }
    callback(undefined, true);
  },
});

module.exports = imageUpload;
