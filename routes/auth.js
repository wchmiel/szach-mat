/*jshint esversion: 6 */

const express = require("express"),
      router = express.Router(),
      serverMainConst = require("../constants/server/server-main.const"),
      User = require("../models/user"),
      jwt = require("jsonwebtoken"),
      fs = require('fs'),
      middleware = require('../helpers/middlewares/auth'),
      validators = require('../helpers/validators/auth');


router.post('/signin', (req, res, next) => {
  User.find({email: req.body.email, password: req.body.password}, (err, user) => {
    if (err) {
      res.json({valid: false, error_type: 'db', error_mess: "We have problem with our database. Try again later.", error: err});
    } else if (!user.length) {
      res.json({valid: false, error_type: 'user_data', error_mess: "Invalid user data. Try again.", error: {}});
    } else {

      // Creating JWT
      try {
        const userId = toString(user[0]._id);

        // PRIVATE KEY
        const options = {
           key: fs.readFileSync('./constants/private-key/key.pem', 'utf8'),
           cert: fs.readFileSync('./constants/private-key/server.crt', 'utf8')
        };
        const jwtBearerToken = jwt.sign({}, options, {
          algorithm: 'RS256',
          expiresIn: serverMainConst.JWT_EXPIRES_IN,
          subject: userId
        });

        // sending JWT info to client
        res.status(200).json({
          valid: true,
          idToken: jwtBearerToken,
          expiresIn: serverMainConst.JWT_EXPIRES_IN
        });
      } catch(error) {
        console.log(error);
        res.json({valid: false, error_type: 'jwt', error_mess: "We have problem with authentication. Try again later.", error: err});
      }
    }
  });
});

router.post('/signup', (req, res, next) => {

  const userValid = validators.ValidateUserSignupData(req.body);
  if (userValid.valid) {

    // check if user email and nick are uniqueness
    User.find({email: req.body.email}, (err, email) => {
      if (err) {
        res.json({valid: false, error_type: 'db', error_mess: "Database error. Try again later.", error: err});
      } else if (email.length) {
        res.json({ valid: false, error_type: 'email', error_mess: "This email is already registered.", error: {}});
      } else {
        User.find({nick: req.body.nick}, (err, nick) => {
          if (err) {
            res.json({valid: false, error_type: 'db', error_mess: "Database error. Try again later.", error: err});
          } else if (nick.length) {
            res.json({valid: false, error_type: 'nick', error_mess: "This nick is already registered.", error: {}});
          } else {

            // If user email and nick are uniqueness then create a new user
            User.create({
              nick: req.body.nick,
              email: req.body.email,
              password: req.body.password
            }, (err, user) => {
              if(err) {
                res.json({valid: false, error_type: 'db', error_mess: "Database error. Try again later.", error: err});
              } else {
                res.json({valid: true});
              }
            });
          }
        });
      }
    });

  } else {
    res.json(userValid);
  }

});


router.get('/account', middleware.checkIfAuthenticated, middleware.handleTokenErrors, (req, res, next) => {
  res.json({
    status: 200,
    authorized: true
  });
});

router.get('/check/authentication', middleware.checkIfAuthenticated, middleware.handleTokenErrors, (req, res, next) => {
  console.log('success - user authorized!');
  res.json({success: true, message: 'User authorized.'});
});



module.exports = router;



// const example1 = new Example({
//   title: "A new exapmple title 2",
//   isDone: false
// });
// example1.save((err, done) => {
//   if (err) {
//     console.log("Something went wrong!");
//   } else {
//     console.log("The new example added!");
//     console.log(done);
//   }
// });
// Example.create({
//   title: "A new exapmple title 3",
//   isDone: false
// }, (err, example) => {
//   // calbeck here
// });
//
// Example.find({}, (err, examples) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(examples);
//     }
// });
