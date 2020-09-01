const User = require('../../models/user')
const utils = require('../utils')
const jwt = require('jsonwebtoken');
const userClass = require('../../classes/userClass');
const AccessToken = require('../../classes/accessTokenClass');

async function loginOauth2User(res, userInfo) {
    const accessTokenDao = new AccessToken();

    User.find({
        "email": userInfo.emails[0].value
    })
        .exec()
        .then(async usrOne => {
            if (usrOne.length === 0) {
                let user = new User(await userClass.creatNewOauth2User(userInfo));
                user.save()
                    .then(async usr => {
                        const token = await accessTokenDao.generateToken(userInfo.googleId !== undefined ? userInfo.googleId : usr._id, usr._id);
                        const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usr._id);
                        const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usr._id);

                        res.redirect("http://localhost:5000/login?token=" + basedAccesstoken +
                            "&userId=" + usr._id + "&imageUrl=" + usr.imageUrl + "&givenName=" +
                            usr.givenName + "&familyName=" + usr.familyName + "&dateOfCreation=" + usr.dateOfCreation);
                    })
                    .catch(err => utils.defaultError(res, err));
            } else {

                const token = await accessTokenDao.generateToken(userInfo.googleId !== undefined ? userInfo.googleId : usrOne[0]._id, usrOne[0]._id);
                const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usrOne[0]._id);
                const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usrOne[0]._id);

                res.redirect("http://localhost:5000/login?token=" + basedAccesstoken +
                    "&userId=" + usrOne[0]._id + "&imageUrl=" + usrOne[0].imageUrl + "&givenName=" +
                    usrOne[0].givenName + "&familyName=" + usrOne[0].familyName + "&dateOfCreation=" + usrOne[0].dateOfCreation);
            }

        })
        .catch(err => utils.defaultError(res, err))
}

async function loginOauth2UserVia42(res, userInfo) {
    const accessTokenDao = new AccessToken();

    User.find({
        "email": userInfo.emails[0].value
    })
        .exec()
        .then(async usrOne => {
            if (usrOne.length === 0) {
                let user = new User(await userClass.creatNewOauth2UserVia42(userInfo));
                user.save()
                    .then(async usr => {
                        const token = await accessTokenDao.generateToken(userInfo.id !== undefined ? userInfo.id : usr._id, usr._id);
                        const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usr._id);
                        const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usr._id);

                        res.redirect("http://localhost:5000/login?token=" + basedAccesstoken +
                            "&userId=" + usr._id + "&imageUrl=" + usr.imageUrl + "&givenName=" +
                            usr.givenName + "&familyName=" + usr.familyName + "&dateOfCreation=" + usr.dateOfCreation);
                    })
                    .catch(err => utils.defaultError(res, err));
            } else {

                const token = await accessTokenDao.generateToken(userInfo.googleId !== undefined ? userInfo.googleId : usrOne[0]._id, usrOne[0]._id);
                const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usrOne[0]._id);
                const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usrOne[0]._id);

                res.redirect("http://localhost:5000/login?token=" + basedAccesstoken +
                    "&userId=" + usrOne[0]._id + "&imageUrl=" + usrOne[0].imageUrl + "&givenName=" +
                    usrOne[0].givenName + "&familyName=" + usrOne[0].familyName + "&dateOfCreation=" + usrOne[0].dateOfCreation);
            }

        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    loginOauth2UserVia42,
    loginOauth2User
}