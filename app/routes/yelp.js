var yelpAPI = require('yelp-api');
var apiKey = '81fLxhTR0I7D6azLHNAUlu88BxvFgonIl8rD-oguXUftxtdkI5DjI0AB8SEQ1w2uG3N5WobKaHuyY-Hng_jhLPFHYeuptXgzycy2gEbJxg-V_TU8wJ4A35ASpsWVW3Yx';

module.exports = function(req, res) {
  console.log("HELLO I AM THE REQ >>>>>>>>", req);
  var yelp = new yelpAPI(apiKey);
  var zip = JSON.parse(req);
  var params = [{ location: zip }];
  yelp.query('businesses/search', params)
  .then(data => {
    var dataArray = JSON.parse(data).businesses;
    var yelpData = { 
      businesses: []
    }

    dataArray.forEach(business => {
      var dataObject = {
        name: business.name,
        rating: business.rating,
        phone: business.phone,
        image: business.image_url,
        id: business.id
      }
      yelpData.businesses.push(dataObject);
    })
  })
  .catch(err => {
    console.log(err);
  });
};

