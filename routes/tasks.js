/*jshint esversion: 6 */

const express = require("express"),
      router = express.Router(),
      multer  = require('multer'),
      User = require("../models/user"),
      jwt = require("jsonwebtoken"),
      middleware = require('../helpers/middlewares/auth');


const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files/account/images'); // files path
  },
  filename: function (req, file, cb) {

    // validate the file extension
    if (!file.mimetype.match(/\image\/(png|jpg|jpeg)$/)) {
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
      const ext = file.originalname.split('.').pop();
      cb(null, req.user.sub + '_' +  Date.now() + '.' + ext); // name of the uploaded file
      // cb(null, req.user.sub + '.' + ext); // name of the uploaded file
    }
  }
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: { fileSize: 2000000 } // maks file size 2mb
}).single('avatar');


router.post('/uploadFile', middleware.checkIfAuthenticated, middleware.handleTokenErrors, function (req, res) {
  uploadAvatar(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({success: false, message: 'File size is to large. Max limit is 2MB.'});
      } else if (err.code === 'filetype') {
        res.json({success: false, message: 'File type is invalid. Must be .png/.jpg/.jpeg .'});
      } else {
        console.log('Szach-mat error occured:');
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

router.post('/account/update/userdata',
  middleware.checkIfAuthenticated,
  middleware.handleTokenErrors,
  function (req, res) {
    if (!req.body.name && !req.body.surname) {
      res.json({success: false, message: 'Empty filds.'});
    } else {

      User.findByIdAndUpdate(req.user.sub, {name: req.body.name, surname: req.body.surname}, (err, user) => {
        if (err) {
          res.json({success: false, message: 'There was a problem with database. Try again later.'});
        } else {
          res.json({success: true, message: 'Data updated successfully.'});
        }
      });
    }
  }
);

router.get('/account/get/userdata',
  middleware.checkIfAuthenticated,
  middleware.handleTokenErrors,
  function(req, res) {
    User.findById(req.user.sub, (err, user) => {
      if (err) {
        res.json({success: false, message: 'There was a problem with database. Try again later.'});
      } else {
        res.json({success: true, userData: {
          nick: user.nick,
          email: user.email,
          name: user.name,
          surname: user.surname,
          photo: user.photo
        }});
      }
    });
  }
);



module.exports = router;
