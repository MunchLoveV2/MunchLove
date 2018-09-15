var db = require("../models");

module.exports = function(app) {
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
