var db = require("../models");


module.exports = function(app, userfavorite) {
    app.post("/api/favorites", function(req, res) {
        userfavorite.create(req.body).then(function(favorite) {
            res.json(favorite);
        });
    });

    app.get("/api/profile", function(req, res) {
        console.log("lol");
    });

};