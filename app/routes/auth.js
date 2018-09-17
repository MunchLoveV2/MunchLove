var authController = require("../controllers/authcontroller.js");
module.exports = function(app, passport) {
  // This links to the front page
  app.get("/", authController.main);
  app.get("/signup", authController.signup);
  app.get("/login", authController.login);
  app.get("/aboutus", authController.aboutus);
  // figure this out tomorrow. how to link to yelp api
  // app.post(
  //   "/",
  //   YELPSOMETHINGHEREOMGWAT.search("api", {
  //     successRedirect: "/searchresults",
  //     failureRedirect: "/"
  //   })
  // );
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup"
    })
  );

  app.get("/profile", isLoggedIn, authController.profile);
  app.get("/searchresults/:location", authController.searchresults);
  app.get("/logout", authController.logout);
  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  );
  app.get("*", authController.error);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  }
};
