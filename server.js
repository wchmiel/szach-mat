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
// mongoose.connect("mongodb://localhost/szach-dev");
var dbUrl = process.env.DATABASE || "mongodb://localhost/szach-dev";
mongoose.connect(dbUrl);
// mongoose.connect("mongodb://wojton:123qwe@ds231559.mlab.com:31559/szach-mat");

// Api routes folders
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');
const indexRoute = require('./routes/index');
// const tasksRoute = require('./routes/tasks');

// View Engine
app.set('views', path.join(__dirname, 'client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
// app.use(express.static(__dirname + "/client"));
app.use('', express.static(path.join(__dirname + '/client/dist')));
app.use('/public', express.static(path.join(__dirname + '/public')));
// app.set("view engine", "ejs");

//use to override http method (mandatory to use PUT, DESTROY methods)
app.use(methodOverride("_method"));

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('cache-control', 'no-cache');
  // res.header('Access-Control-Allow-Headers', '*');
  next();
});

// routes
app.use('/api/auth', authRoute);
app.use('/api/tasks', tasksRoute);
app.use('/', indexRoute);

app.listen(serverMainConst.SERVER_PORT, () => {
  console.log('Szach-mat app listening on port ' + serverMainConst.SERVER_PORT);
  console.log(dbUrl);
});
