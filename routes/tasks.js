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

router.post('/task/signup', (req, res, next) => {
  // const userData = req.body;
  // console.log(userData);
  // res.json(userData);
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
