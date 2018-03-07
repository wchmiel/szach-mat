/*jshint esversion: 6 */

const express = require("express"),
      app = express(),
      path = require('path'),
      serverMainConst = require("./constants/server/server-main.const"),
      request = require("request"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");

// Connect to db using mongoose
mongoose.connect("mongodb://localhost/szach-dev");

// Api routes folders
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
// const tasksRoute = require('./routes/tasks');

// View Engine
app.set('views', path.join(__dirname, 'client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(__dirname + "/client"));
// app.set("view engine", "ejs");

//use to override http method (mandatory to use PUT, DESTROY methods)
app.use(methodOverride("_method"));

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// routes
app.use('/', indexRoute);
app.use('/api/auth', authRoute);
// app.use('/api/task', tasksRoute);

app.listen(serverMainConst.SERVER_PORT, () => {
  console.log('Szach-mat app listening on port ' + serverMainConst.SERVER_PORT);
});
