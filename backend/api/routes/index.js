var express = require('express');
var router = express.Router();
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/googleOath2');
const oauth2Controller = require('../../api/controllers/oauth2Controller')
var FortyTwoStrategy = require('passport-42').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: keys.clientId,
  clientSecret: keys.clientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}))


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Googe Oauth2
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google Oauth2 callback url
router.get('/auth/google/callback', passport.authenticate('google'), oauth2Controller.googleOauth2);


// 42
passport.use(new FortyTwoStrategy({
  clientID: `f70297f82626c75530095926c74be94b13125f221dfaeb84939af7eb5e577aa2`,
  clientSecret: `283224cfe2096e88b44006727c3a2797cc187b73fe3467df07833448eef9d9f2`,
  callbackURL: '/auth/42/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));


router.get('/login/42',
  passport.authenticate('42'));

router.get('/auth/42/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  oauth2Controller.Oauth2Via42);

module.exports = router;
