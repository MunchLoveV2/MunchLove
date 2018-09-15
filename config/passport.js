
// linking this to the models folder so it recognizes the other important basic stuff
var db = require("../models");
var passport = require("passport");
var bcrypt = require("bcrypt");
// exporting the passport function witch has all of the passport functions we need
// might be missing a logout model function.... dont know yet!
// these include serialize/deserialize user to start/end session

module.exports = function() {
  // Linking this doc to passport-local package although this entire doc should probably be in server.js
  var LocalStrategy = require("passport-local").Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.Userinfos.findById(id).then(function(err, user) {
      done(err, user);
    });
  });
  // this function, aka passport.use local signup,
  // is a model func. where it creates the stuff that goes in the DB
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        username: "username",
        accountKey: "accountKey",
        email: "email",
        passReqToCallback: true
      },
      function(req, username, accountKey, done) {
        var generateHash = function(accountKey) {
          return bcrypt.hashSync(accountKey, bcrypt.genSaltSync(8), null);
        };
        db.Userinfos.findOne({
          where: {
            username: username
          }
        }).then(function(user, err) {
          if (err) {
            console.log("err", err);
            return done(err);
          }
          if (user) {
            console.log("signupMessage", "That username is already taken.");
            return done(
              null,
              false,
              req.flash("signupMessage", "That username is already taken.")
            );
          } else {
            var userPassword = generateHash(accountKey);

            db.Userinfos.create({
              username: req.body.username,
              email: req.body.email,
              accountKey: userPassword
            })
              // I dont know what this part does so if anything messes up check this first
              .then(function(dbUser) {
                return done(null, dbUser);
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        });
      }
    )
  );

  // dis one is the login model func. idk how exactly bcrypt compares/syncs
  // the password hashes... but it does... i hope
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        username: "username",
        accountKey: "accountKey",
        passReqToCallback: true
      },
      function(username, accountKey, done) {
        var validPassword = function(accountKey) {
          return bcrypt.compareSync(accountKey, this.accountKey);
        };
        db.Userinfos.findOne({
          where: {
            username: username
          }
        }).then(function(err, user) {
          var passwordAttempt = validPassword(accountKey);
          if (err) {
            console.log("err", err);
            return done(err);
          }
          if (!user) {
            console.log("no user found");
            return done(
              null,
              false,
              req.flash("loginMessage", "No user with that username found.")
            );
          }
          // if something goes wrong this might be it bc idk what
          if (!passwordAttempt) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            );
          } else {
            return done(null, user);
          }
        });
      }
    )
  );
};
