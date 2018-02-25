/*jshint esversion: 6 */

const mongoose = require("mongoose");

var exampleSchema = mongoose.Schema({
  title: String,
  isDone: Boolean
});

module.exports = mongoose.model("Example", exampleSchema);
