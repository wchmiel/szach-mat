/*jshint esversion: 6 */

const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  nick: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
