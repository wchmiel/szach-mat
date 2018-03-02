/*jshint esversion: 6 */

const express = require("express"),
      router = express.Router(),
      User = require("../models/user");


// router.get('/tasks', (req, res, next) => {
//   Example.find({}, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(data);
//     }
//   });
// });

router.post('/signup', (req, res, next) => {

  const userValid = ValidateUserSignupData(req.body);
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


// Validators
const ValidateUserSignupData = function(userData) {
  if (userData.nick) {
    if(validateEmail(userData.email)) {
      if (passwordLengthValidator(userData.password)) {
        return { valid: true };
      } else {
        return { valid: false, error_type: 'password', error_mess: "Password is too short.", error: {}};
      }
    } else {
      return { valid: false, error_type: 'email', error_mess: "Email is not correct.", error: {}};
    }
  } else {
    return { valid: false, error_type: 'nick', error_mess: "User Nick is empty.", error: {}};
  }
};

const validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const passwordLengthValidator = function(pass) {
  return (pass.length < 6) ? false : true;
};
