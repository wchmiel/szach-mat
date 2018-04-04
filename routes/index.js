/*jshint esversion: 6 */

const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/*', (req, res, next) => {
  res.render('index.html');
  // res.sendFile(path.normalize(path.join(__dirname + '/../client/dist/index.html')));
});

<<<<<<< HEAD
// router.get('*', (req, res) => {
//   res.send('BLAD!');
//   // res.redirect('/');
// });
=======
router.get('*', (req, res) => {
  res.redirect('/');
});
>>>>>>> d6e1fed... heroku server settings v2

module.exports = router;
