var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/userinfo", function(req, res) {
    db.Userinfos.findAll({}).then(function(dbUserinfos) {
      res.json(dbUserinfos);
    });
  });

  // Create a new example
  app.post("/api/userinfo", function(req, res) {
    db.Userinfos.create(req.body).then(function(dbUserinfos) {
      res.json(dbUserinfos);
    });
  });

  // Delete an example by username
  app.delete("/api/userinfo/:username", function(req, res) {
    db.Userinfos.destroy({ where: { username: req.params.username } }).then(
      function(dbUserinfos) {
        res.json(dbUserinfos);
      }
    );
  });
};
