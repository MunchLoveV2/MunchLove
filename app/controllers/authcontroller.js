var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};
exports.error = function(req, res) {
  res.render("404");
};
exports.login = function(req, res) {
  res.render("login");
};
exports.searchresults = function(req, res) {
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
    
    var yelpData = { 
      businesses: []
    }

    dataArray.forEach(data => {
      var dataObject = {
        name: data.name,
        rating: data.rating,
        phone: data.phone,
        image: data.image_url,
        id: data.id
      }
      yelpData.businesses.push(dataObject);
    })


    res.render("searchresults", yelpData);

  })
  .catch(err => {
    // Failure
    console.log(err);
  });
};
exports.profile = function(req, res) {
  var user = {
    id: req.session.passport.user,
    isloggedin: req.isAuthenticated()
  };
  res.render("profile");
};
exports.aboutus = function(req, res) {
  res.render("aboutus");
};
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
exports.main = function(req, res) {
  if (req.isAuthenticated()) {
    var user = {
      id: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    res.render("frontpage");
  } else {
    res.render("frontpage");
  }
};
