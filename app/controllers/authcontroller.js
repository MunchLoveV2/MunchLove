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
  res.render("searchresults");
};
exports.profile = function(req, res) {
  console.log("HELLLOOOOOO>>>>>>>>>", req.user);
  console.log(req.isAuthenticated());
  res.render("profile", { username: req.user.username });
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
  console.log("HELLLOOOOOO>>>>>>>>>", req.user);
  console.log(req.isAuthenticated());
  res.render("frontpage");
};
