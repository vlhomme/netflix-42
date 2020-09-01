const loginOauth2UserService = require('../services/userServices/userOauth2GoogleService');

googleOauth2 = (req, res, next) => {
    loginOauth2UserService.loginOauth2User(res, req.user)
}

Oauth2Via42 = (req, res, next) => {
    loginOauth2UserService.loginOauth2UserVia42(res, req.user)
}


module.exports = {
    googleOauth2,
    Oauth2Via42
}