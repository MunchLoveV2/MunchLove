var db = require("../models");
var passport = require("passport");
module.exports = function(app) {
  // AUTH STUFF
      // logging in
      app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user) {
          console.log("\n\n\n########userrrr", user)
          if (err) {
            console.log("passport err", err);
          return next(err); // will generate a 500 error
          }
          if (!user) {
            return res.send({ success : false, message : 'authentication failed'});
          }
          req.login(user, loginErr => {
            if (loginErr) {
              console.log("loginerr", loginErr)
            return next(loginErr);
            }
            console.log('redirecting....');
            res.cookie("username", user.username);
            res.cookie('user_id', user.uuid );
            return res.json(true);
          });      
        })(req, res, next);
      }
    );
    
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup'
    }
 
  ));

      // logout
  app.get('/logout', function(req, res) {
    req.session.destroy(function(err){
      req.logout();
      res.clearCookie('user_sid');
      res.clearCookie('first_name');
      res.clearCookie('user_id');
      res.redirect('/');
    })
  });

 app.get("/signup", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/profile");
    } else {
        res.render("signup", {
          msg: "Join the MunchLovers!",
          userinfos: db.userinfo
        });
      };
    });

    // not made yet favorites page
  app.get("/favorites/:id", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("favorites");
    } else {
      res.render("404");
    }
  });

// not made yet profile page
  app.get("/profile", function(req, res) {
    console.log("%%%%%%%%% is logged in", req.isAuthenticated());
    if (req.isAuthenticated()) {
      db.Userinfos.findOne({
        where: {
          id: req.session.passport.id
        }
      }).then(function(dbUserinfos) {
        var user = {
          userInfo: dbUserinfos.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("profile", user);
      });
    } else {
        res.redirect("/");
    }
  });

  // Load example page and pass in an example by id
  app.get("/favorites/:id", function(req, res) {
      res.render("userinfo", {
        userinfo: dbUserfavorites
      });
    });

    // NON AUTH STUFF
  // load login page
  app.get("/login", function(req, res) {
    res.render("login", {
      msg: "Login Fellow Muncher!",
      userinfos: db.userinfo
    });
  });

  // load about us
  app.get("/aboutus", function(req, res) {
    res.render("aboutus");
  });

  // search results page
  app.get("/searchresults", function(req, res) {
    res.render("searchresults");
  });

  // This links to the front page
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render("frontpage", user);
    } else {
      res.render("frontpage");
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
