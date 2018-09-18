module.exports = function(yelp, userfavorite) {
var params = {};
yelp.use(
  new params(
    {location: "zip"}
  ),
  yelp.query(
    'businesses/search', 
    params.location
  )
).then(data => {
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
    };
  yelpData.businesses.push(dataObject);
  })
})
};

