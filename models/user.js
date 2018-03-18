/*jshint esversion: 6 */

const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  nick: String,
  email: String,
  password: String,
  name: String,
  surname: String,
  photo: { type: String, default: 'default.svg'},
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date }
});

module.exports = mongoose.model("User", userSchema);
