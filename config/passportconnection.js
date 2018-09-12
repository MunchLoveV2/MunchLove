var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.uuid);
  });

  passport.deserializeUser(function(uuid, done) {
    db.Userinfos.findById(uuid).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "accountKey",
        emailField: "email",
        passReqToCallback: true
      },

      function(req, username, accountKey, done) {
        process.nextTick(function() {
          db.Userinfos.findOne({
            where: {
              username: username
            }
          }).then(function(username, err) {
            if (err) {
              console.log("err", err);
              return done(err);
            }
            if (username) {
              console.log("signupMessage", "That username is already taken.");
              return done(
                null,
                false,
                req.flash("signupMessage", "That username is already taken.")
              );
            } else {
              db.Userinfos.create({
                username: req.body.username,
                email: req.body.email,
                password: db.Userinfos.generateHash(accountKey)
              })
                .then(function(dbUserinfos) {
                  return done(null, dbUserinfos);
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "accountKey",
        passReqToCallback: true
      },
      function(req, username, accountKey, done) {
        db.Userinfos.findOne({
          where: {
            username: req.body.username
          }
        }).then(function(username, err) {
          if (err) {
            console.log("err", err);
            return done(err);
          }
          if (!username) {
            console.log("no user found");
            return done(
              null,
              false,
              req.flash("loginMessage", "No user with that username found.")
            );
          }
          if (username && !username.validPassword(req.body.accountKey)) {
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
