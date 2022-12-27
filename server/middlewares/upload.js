const util = require('util');
const path = require('path');
const multer = require('multer');


const imageFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else{
    cb('Please upload image only', false)
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/resources/static/assets/uploads')
  },
  filename: (req, file, cb) => {
    let filename =`${Date.now()}-${file.originalname}`;
    cb(null, filename)
  }
});
// upload multiple Images at the same time
var uploadImages = multer({
  storage: storage,
  fileFilter: imageFilter
}).array("multi-files", 10);


var uploadImagesMiddleware = util.promisify(uploadImages);

module.exports = uploadImagesMiddleware;
