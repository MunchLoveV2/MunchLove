var authController = require('../controllers/authcontroller.js');
module.exports = function(app, passport) {
    // This links to the front page
  app.get("/", authController.main);
  app.get('/signup', authController.signup);
  app.get('/login', authController.login);
  app.post('/signup', passport.authenticate('local-signup', 
  {
    successRedirect: '/profile',
    failureRedirect: '/signup'
    }
));
app.get('/profile',isLoggedIn, authController.profile);
app.get('/logout',authController.logout);
app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}
));
app.get("*", authController.error);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();   
    } else {         
        res.redirect('/login');
    }
}

}