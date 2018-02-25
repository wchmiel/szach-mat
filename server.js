/*jshint esversion: 6 */

const express = require("express"),
      app = express(),
      serverMainConst = require("./constants/server/server-main.const"),
      request = require("request"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      Example = require("./models/example");

// Connect to db using mongoose
mongoose.connect("mongodb://localhost/tasks");

// Api routes folders
const index = require('./routes/index');
const tasks = require('./routes/tasks');

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(__dirname + "/client"));
// app.set("view engine", "ejs");

//use to override http method (mandatory to use PUT, DESTROY methods)
app.use(methodOverride("_method"));

// routes
app.use('/', index);
app.use('/api', tasks);

app.listen(serverMainConst.SERVER_PORT, () => {
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
  Example.create({
    title: "A new exapmple title 3",
    isDone: false
  }, (err, example) => {
    // calbeck here
  });

  Example.find({}, (err, examples) => {
      if (err) {
        console.log(err);
      } else {
        console.log(examples);
      }
  });

  console.log('Szach-mat app listening on port ' + serverMainConst.SERVER_PORT);
});
