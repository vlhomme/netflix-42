const express = require('express');
const router = express.Router();
const oauth2Controller = require('../controllers/oauth2Controller');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/googleOath2');

passport.use(new GoogleStrategy({
    clientID: keys.clientId,
    clientSecret: keys.clientSecret,
    callbackURL: 'auth/google/callback'
}, (accessToken) => {
        console.log("accessToken", accessToken);
    }
));


/*
** [GET] Route:"/oauth2/google" [USED]
*/

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

/*
** [GET] Route:"/users/oauth2/auth/google/callback" [USED]
*/

router.get('/google/callback', passport.authenticate('google'));

module.exports = router;