require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

// Password auth stuffs
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport password auth stuff
app.use(
  session({
    secret: "goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8",
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("views/images"));

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// For Handlebars

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// models
var db = require("./app/models");

// routes
var authRoute = require("./app/routes/auth.js")(app, passport);


//load passport strategies
require("./config/passport.js")(passport, db.userinfo);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function(err) {
    if (!err) {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    } else {
      console.log(err);
    }
  });
});
