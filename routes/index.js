/*jshint esversion: 6 */

const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/*', (req, res, next) => {
  res.render('index.html');
  // res.sendFile(path.normalize(path.join(__dirname + '/../client/dist/index.html')));
});

module.exports = router;
