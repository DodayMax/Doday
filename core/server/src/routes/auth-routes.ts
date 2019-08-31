import passport from 'passport';
import * as apiController from '../controllers/api';

// API keys and Passport configuration
import * as passportConfig from '../config/passport';

module.exports = app => {
  /**
   * API examples routes.
   */
  app.get('/api', apiController.getApi);
  app.get(
    '/api/facebook',
    passportConfig.isAuthenticated,
    passportConfig.isAuthorized,
    apiController.getFacebook
  );

  /**
   * OAuth authentication routes. (Sign in)
   */
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email', 'public_profile'],
    })
  );
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      res.redirect(req.session.returnTo || '/');
    }
  );

  app.get('/api/currentHero', (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.status(200).send(req.user);
    } else {
      res.status(204).send('');
    }
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.status(200).redirect('/');
  });
};
