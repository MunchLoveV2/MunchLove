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

  app.get("/searchresults/:location", function(req, res) {
    var location = req.params.location;
    
    var yelpAPI = require('yelp-api');
 
    // Create a new yelpAPI object with your API key
    var apiKey = '81fLxhTR0I7D6azLHNAUlu88BxvFgonIl8rD-oguXUftxtdkI5DjI0AB8SEQ1w2uG3N5WobKaHuyY-Hng_jhLPFHYeuptXgzycy2gEbJxg-V_TU8wJ4A35ASpsWVW3Yx';
    var yelp = new yelpAPI(apiKey);
 
    // Set any parameters, if applicable (see API documentation for allowed params)
    var params = [{ location: location }];
 
    // Call the endpoint

    yelp.query('businesses/search', params)
    .then(data => {
      // Success
      var dataArray = JSON.parse(data).businesses;
      console.log(dataArray);
      
      var yelpData = { 
        businesses: []
      }

      dataArray.forEach(data => {
        var dataObject = {
          name: data.name,
          rating: data.rating,
          phone: data.phone,
          image: data.image_url
        }
        yelpData.businesses.push(dataObject);
      })

  
      res.render("searchresults", yelpData);

    })
    .catch(err => {
      // Failure
      console.log(err);
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
  // This links to the front page
  app.get("/", function(req, res) {
    res.render("frontpage");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
