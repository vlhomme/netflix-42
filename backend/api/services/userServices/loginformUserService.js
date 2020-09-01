const User = require('../../models/user')
const utils = require('../utils')
const jwt = require('jsonwebtoken');
const userClass = require('../../classes/userClass');
const AccessToken = require('../../classes/accessTokenClass');
const verifyPwd = require('../../utils/passwordMatchVerification');

async function userExist(emailPsudo) {
    return new Promise((resolve, rejct) => {
        User.find(
            {
                $or: [
                    { 'email': emailPsudo },
                    { 'pseudonyme': emailPsudo }
                ]
            }
        ).then(usr => {
            resolve(usr)
        }).catch(err => {
            throw new err;
        })
    })
}

async function loginformUser(data, res) {
        // check if emal/psudo exit
        let user = await userExist(data.email);
        const accessTokenDao = new AccessToken();

        if (user.length > 0) {
            // Check password
            if (await verifyPwd.passwordMatchVerification(data.password, user[0].password)) {
                // return data
                const token = await accessTokenDao.generateToken(user[0]._id, user[0]._id);
                const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, user[0]._id);
                const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, user[0]._id);

                res.status(200).json({
                    code: 200,
                    token: basedAccesstoken,
                    userId: user[0]._id,
                    imageUrl: user[0].imageUrl,
                    givenName: user[0].givenName,
                    familyName: user[0].familyName,
                    dateOfCreation: user[0].dateOfCreation
                })

            } else {
                res.status(200).json({
                    msg: "Email and/or password not correct",
                    code: 204
                })
            }
            // return error
        } else {
            res.status(200).json({
                msg: "Email and/or password not correct",
                code: 204
            })
        }
}

module.exports = {
    loginformUser,
}
