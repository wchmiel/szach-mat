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
  // const userData = req.body;
  // console.log(userData);
  // res.json(userData);
  const userValid = ValidateUserSignupData(req.body);
  if (userValid.valid) {
    const userDataUniqueness = ValidateUserDataUniqueness(req.body); // blad poniewaz kod jest asynchorniczny w tamtej funkcji - zrobic tam Observable albo Promise
    console.log(req.body);
    if (userDataUniqueness.valid) {
      User.create({
        nick: req.body.nick,
        email: req.body.email,
        password: req.body.password
      }, (err, user) => {
        if(err) {
          res.json(err);
        } else {
          res.json(user);
        }
      });
    } else {
      console.log('uniqueness error: ', userDataUniqueness);
      res.json(userDataUniqueness);
    }
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
const ValidateUserDataUniqueness = function(userData) { // asynchorniczny kod - zrobic Observable!!!!!!!!
  User.find({email: userData.email}, (err, email) => {
    if (err) {
      // console.log({valid: false, error_database: "Database error. Try again later."});
      return {valid: false, error_database: "Database error. Try again later."};
    } else if (email) {
      // console.log({valid: false, error_email: "This email is already registered."});
      return { valid: false, error_email: "This email is already registered." };
    } else {
      User.find({nick: userData.nick}, (error, nick) => {
        if (error) {
          // console.log({valid: false, error_database: "Database error. Try again later."});
          return {valid: false, error_database: "Database error. Try again later."};
        } else if (nick) {
          // console.log({valid: false, error_nick: "This nick is already registered. Try another one."});
          return {valid: false, error_nick: "This nick is already registered. Try another one."};
        } else {
          // console.log({valid: true});
          return {valid: true};
        }
      });
    }
  });
};

const ValidateUserSignupData = function(userData) {
  if (userData.nick) {
    if(validateEmail(userData.email)) {
      if (passwordLengthValidator(userData.password)) {
        return { valid: true };
      } else {
        return { valid: false, error_password: "Password is too short." };
      }
    } else {
      return { valid: false, error_email: "Email is not correct." };
    }
  } else {
    return { valid: false, error_nick: "User Nick is empty." };
  }
};

const validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const passwordLengthValidator = function(pass) {
  return (pass.length < 6) ? false : true;
};
