var db = require("../models");

module.exports = function(app) {
  // load login page
  app.get("/login", function(req, res) {
    db.Userinfo.findAll({}).then(function(dbUserinfos) {
      res.render("login", {
        msg: "Login Fellow Muncher!",
        userinfos: dbUserinfos
      });
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
  // Load example page and pass in an example by id
  app.get("/userinfo/:id", function(req, res) {
    db.Userinfo.findOne({ where: { id: req.params.id } }).then(function(
      dbUserinfo
    ) {
      res.render("userinfo", {
        userinfo: dbUserinfo
      });
    });
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

  app.get("/profile", function(req, res) {
    console.log("%%%%%%%%% is logged in", req.isAuthenticated());
    if (req.isAuthenticated()) {
      db.Userinfos.findOne({
        where: {
          uuid: req.session.passport.user
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
      var user = {
        id: null,
        isloggedin: req.isAuthenticated()
      };
      res.redirect("/");
    }
  });

  app.get("/signup", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/profile");
    } else {
      db.Userinfo.findAll({}).then(function(dbUserinfos) {
        res.render("signup", {
          msg: "Join the MunchLovers!",
          userinfos: dbUserinfos
        });
      });
    }
  });

  app.get("/favorites", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("favorites");
    } else {
      res.render("404");
    }
  });

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

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      console.log("info", info);
    if (err) {
      console.log("passport err", err);
    return next(err); // will generate a 500 error
    }
    if (! user) {
      console.log("user error", user);
    return res.send({ success : false, message : 'authentication failed' });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        console.log("loginerr", loginerr)
        return next(loginErr);
      }
      console.log("redirecting....");
      res.cookie("username", user.username);
      res.cookie("user_id", user.uuid );
    return res.redirect("/profile");
    });      
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
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
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
