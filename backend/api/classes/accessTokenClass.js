const jwt = require('jsonwebtoken');
const AccessTokenObj = require('../models/jwtToken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

module.exports = class AccessToken {

    async hashToken(token) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(token, 10, (err, hash) => {
                resolve(hash);
            })
        })
    }

    getTokenByAccessToken(accesstoken) {
        return new Promise(async (resolve, reject) => {
            AccessTokenObj.find({
                accessToken: accesstoken,
                tokenDeleted: false
            }, {
                    useFindAndModify: false
                }).then(result => {
                    resolve(result[0].token);
                }).catch(err =>  {
                    console.log("getTokenByAccessToken ERR :", err)
                    resolve(null);
            });
        })
    }

    removeAllOldAccessToken(userId) {
        return new Promise(async (resolve, reject) => {
            AccessTokenObj.deleteMany({
                user_id: userId,
            }, function (err) {
                if (err) console.log("removeAllOldAccessToken Err : ", err)
                resolve(true);
            })
        })
    }

    async saveTokenAndGetAccessToken(token, userId) {
        return new Promise(async (resolve, reject) => {
            const jwtToken = new AccessTokenObj();
            if (await this.removeAllOldAccessToken(userId)) {
                jwtToken.user_id = userId;
                jwtToken._id = new mongoose.Types.ObjectId;
                jwtToken.token = token;
                const accessTokenValue = await this.hashToken(token);
                jwtToken.accessToken = accessTokenValue;
                jwtToken.save()
                    .then(result => resolve(accessTokenValue))
                    .catch(err => console.log("saveTokenAndGetAccessToken ERR :", err))
            } else {
                resolve("");
            }
        })
    }

    async generateToken(id, data) {
        return new Promise((resolve, reject) => {
            const token = jwt.sign({
                id: id,
                data: data,
            }, process.env.JWT_KEY, {
                    expiresIn: process.env.TOKEN_DURATION
                })
            resolve(token);
        })
    }


}