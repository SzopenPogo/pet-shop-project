import multer from "multer";

const uploadImage = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error('Only .img or .png'))
    }
    cb(null, true);
  }
});

export default uploadImage;