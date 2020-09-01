const User = require('../../models/user')
const utils = require('../utils')
const jwt = require('jsonwebtoken');
const userClass = require('../../classes/userClass');
const AccessToken = require('../../classes/accessTokenClass');

async function loginUser(res, userInfo) {
    const accessTokenDao = new AccessToken();

    if (userInfo.email !== "") {
        User.find({
            "googleId": userInfo.googleId
        })
            .exec()
            .then(async usrOne => {
                if (usrOne.length === 0) {
                    let user = new User(await userClass.creatNewUser(userInfo));
                    user.save()
                        .then(async usr => { 
                            const token = await accessTokenDao.generateToken(userInfo.googleId, usr._id);
                            const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usr._id);
                            const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usr._id);

                            res.status(200).json({
                                token: basedAccesstoken,
                                userId: usr._id,
                                imageUrl: usr.imageUrl,
                                givenName: usr.givenName,
                                familyName: usr.familyName,
                                dateOfCreation: usr.dateOfCreation
                            })
                        })
                        .catch(err => utils.defaultError(res, err));
                } else {
                    const token = await accessTokenDao.generateToken(userInfo.googleId, usrOne[0]._id);
                    const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usrOne[0]._id);
                    const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usrOne[0]._id);

                    res.status(200).json({
                        token: basedAccesstoken,
                        userId: usrOne[0]._id,
                        imageUrl: usrOne[0].imageUrl,
                        givenName: usrOne[0].givenName,
                        familyName: usrOne[0].familyName,
                        dateOfCreation: usrOne[0].dateOfCreation
                    })

                }

            })
            .catch(err => utils.defaultError(res, err))
    } else {
        res.status(401)
    }
}

module.exports = {
    loginUser
}