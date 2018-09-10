var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/userinfo", function(req, res) {
    db.Userinfo.findAll({}).then(function(dbUserinfos) {
      res.json(dbUserinfos);
    });
  });

  // Create a new example
  app.post("/api/userinfo", function(req, res) {
    db.Userinfo.create(req.body).then(function(dbUserinfos) {
      res.json(dbUserinfos);
    });
  });

  // Delete an example by id
  app.delete("/api/userinfo/:id", function(req, res) {
    db.Userinfo.destroy({ where: { id: req.params.id } }).then(function(dbUserinfos) {
      res.json(dbUserinfos);
    });
  });
};