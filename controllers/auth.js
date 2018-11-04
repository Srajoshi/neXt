var authController = require('./authcontroller.js');


module.exports = function (app, passport) {
  app.get('/signup', authController.signup);
  app.get('/signin', authController.signin);
  app.post('/signup', passport.authenticate('local-signup', {
    successReturnToOrRedirect: '/my-profile',
    failureRedirect: '/signup'
  }));
  // app.get('/my-profile', isLoggedIn, authController.dashboard);
  app.post('/signin', passport.authenticate('local-signin', {
    successReturnToOrRedirect: '/my-profile',
    failureRedirect: '/signinFailed'
  }));
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signinFailed');
  }
  app.get('/logout',authController.logout);
  app.get('/signinFailed', authController.signinFailed);
  app.get('/reviews-search/', authController.reviewsSearch);
}


