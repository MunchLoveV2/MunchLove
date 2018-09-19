var authController = require("../controllers/authcontroller.js");
module.exports = function(app, passport) {
  // This links to the front page
  app.get("/", authController.main);
  app.get("/signup", checkLogIn, authController.signup);
  app.get("/login", checkLogIn, authController.login);
  app.get("/aboutus", authController.aboutus);
  app.post("/frontpage", checkZip, authController.searchresults);
  app.post('/frontpage', (req, res) => {
    const location = req.body.text;
    req.session.location = location;
    util.yelpSearch(location)
      .then((result) => {
        const businessArr = [];
        const results = result.data.search;
        if (result.errors || results.total === 0) {
          console.log(`No businesses found at location: ${location}`);
          res.status(204).send(businessArr);
        } else {
          results.business.forEach((store) => {
            console.log('returned store', store);
            const storeData = {
              name: store.name,
              place_id: store.id,
              address: store.location.formatted_address.split('\n').join(', '),
              phone: store.display_phone,
              website: store.url.split('?')[0],
              photos: store.photos[0],
              price: store.price,
              rating: store.rating,
              latitude: store.coordinates.latitude,
              longitude: store.coordinates.longitude
            };
            businessArr.push(storeData);
          });
          res.status(200).send(businessArr);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Failed to retrieve business data from Yelp API');
      });


  app.get("/searchresults", authController.searchresults);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup"
    })
  );
  app.get("/profile", isLoggedIn, authController.profile);
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

  function checkLogIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/profile");
    }
  }
};
