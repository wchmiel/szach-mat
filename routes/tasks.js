/*jshint esversion: 6 */

const express = require("express"),
      router = express.Router(),
      multer  = require('multer'),
      middleware = require('../helpers/middlewares/auth');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files/account/images'); // files path
  },
  filename: function (req, file, cb) {

    // validate the file extencion
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
      cb(null, file.originalname + '_' +  Date.now()); // name of the uploaded file
    }
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4000000 } // maks file size 5mb
}).single('avatar');



router.post('/uploadFile', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({success: false, message: 'File size is to large. Max limit is 5MB.'});
      } else if (err.code === 'filetype') {
        res.json({success: false, message: 'File type is invalid. Must be .png/.jpg/.jpeg .'});
      } else {
        console.log(err);
        res.json({success: false, message: 'File was not able to be uploaded.'});
      }
    } else {
      // Success uploading
      if (!req.file) {
        res.json({success: false, message: 'No file was selected.'});
      } else {
        res.json({success: true, message: 'File was uploaded.'});
      }
    }

  });
});


// router.post('/uploadFile', upload.single('avatar'), (req, res, next) => {
//   const file = req.file;
//   console.log(req.file);
//   res.json({
//     status: 200,
//     uploaded: true
//   });
// });


module.exports = router;
