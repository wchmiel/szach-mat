/*jshint esversion: 6 */

const express = require("express"),
      router = express.Router(),
      multer  = require('multer'),
      User = require("../models/user"),
      jwt = require("jsonwebtoken"),
      middleware = require('../helpers/middlewares/auth');


const storageAvatar = multer.diskStorage({
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
      const ext = file.originalname.split('.').pop();
      // cb(null, req.user.sub + '_' +  Date.now() + '.' + ext); // name of the uploaded file
      cb(null, req.user.sub + '.' + ext); // name of the uploaded file
    }
  }
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: { fileSize: 4000000 } // maks file size 4mb
}).single('avatar');


router.post('/uploadFile', middleware.checkIfAuthenticated, middleware.handleTokenErrors, function (req, res) {
  uploadAvatar(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({success: false, message: 'File size is to large. Max limit is 4MB.'});
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

        // save user photo name to db
        User.findByIdAndUpdate(req.user.sub, {photo: req.file.filename}, (err, user) => {
          if (err) {
            res.json({success: false, message: 'There was a problem with database. Try again later.'});
          } else {
            res.json({success: true, message: 'File was uploaded.'});
          }
        });

      }
    }

  });
});



module.exports = router;
