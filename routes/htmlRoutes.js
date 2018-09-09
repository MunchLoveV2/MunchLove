var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Userinfo.findAll({}).then(function(dbUserinfos) {
      res.render("index", {
        msg: "Welcome to the MunchLovers!",
        userinfos: dbUserinfos
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/userinfo/:id", function(req, res) {
    db.Userinfo.findOne({ where: { id: req.params.id } }).then(function(dbUserinfo) {
      res.render("userinfo", {
        userinfo: dbUserinfo
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
