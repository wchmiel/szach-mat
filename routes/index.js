/*jshint esversion: 6 */

const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/*', (req, res, next) => {
  res.render('index.html');
<<<<<<< HEAD
  // res.sendFile(path.normalize(path.join(__dirname + '/../client/dist/index.html')));
=======
});

<<<<<<< HEAD
<<<<<<< HEAD
router.get('*', (req, res) => {
  res.send('BLAD!');
  // res.redirect('/');
>>>>>>> 148ebd5... heroku server settings v6
});
=======
=======
>>>>>>> 58f9ee7... clean up in repo.
// router.get('*', (req, res) => {
//   res.send('BLAD!');
//   // res.redirect('/');
// });
<<<<<<< HEAD
>>>>>>> 2e09d6a... heroku server settings v7
=======
>>>>>>> 58f9ee7... clean up in repo.

module.exports = router;
