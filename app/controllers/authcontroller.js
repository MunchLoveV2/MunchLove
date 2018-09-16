var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup');
}
exports.error = function(req, res) {
    res.render("404");
}
exports.login = function(req, res) {
    res.render('login');
}
exports.profile = function(req, res) {
    res.render('profile');
}
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}
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
}