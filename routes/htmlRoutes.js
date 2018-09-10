var db = require("../models");

module.exports = function(app) {
  // Load signup page
  app.get("/signup", function(req, res) {
    db.Userinfo.findAll({}).then(function(dbUserinfos) {
      res.render("signup", {
        msg: "Join the MunchLovers!",
        userinfos: dbUserinfos
      });
    });
  });
  // load login page
  app.get("/login", function(req, res) {
    res.render("login");
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
    db.Userinfo.findOne({ where: { id: req.params.id } }).then(function(dbUserinfo) {
      res.render("userinfo", {
        userinfo: dbUserinfo
      });
    });
  });
  // This links to the front page
  app.get("/", function(req, res) {
    res.render("frontpage");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
