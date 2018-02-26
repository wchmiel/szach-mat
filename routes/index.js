/*jshint esversion: 6 */

const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.html');
});

module.exports = router;
