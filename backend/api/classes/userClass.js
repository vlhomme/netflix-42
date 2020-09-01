const mongoose = require('mongoose');
const hashPwd = require('../utils/hashPwd');

async function getHashPwd() {
    return new Promise(async (resolve, reject) => {
        const genPwd = await hashPwd.hashPassword("Abdeljalil123!testinf!@DSdfvxvVfd+vxcVX_");
        resolve(genPwd);
    })
}

creatNewUser = (value) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            googleId: value.googleId,
            imageUrl: value.imageUrl,
            email: value.email,
            name: value.name,
            password: await getHashPwd(),
            givenName: value.givenName,
            familyName: value.familyName,
            role: "HR"
        })
    });
}

creatNewOauth2User = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            googleId: userInfo.id,
            imageUrl: userInfo.photos[0].value,
            email: userInfo.emails[0].value,
            name: userInfo.displayName,
            password: await getHashPwd(),
            givenName: userInfo.name.givenName,
            familyName: userInfo.name.familyName,
        })
    });
}

creatNewRegisterUser = (userInfo, image) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            imageUrl: image,
            email: userInfo.email,
            name: userInfo.firstname + " " + userInfo.lastname,
            givenName: userInfo.firstname,
            familyName: userInfo.lastname,
            pseudonyme: userInfo.pseudonyme,
            password: await hashPwd.hashPassword(userInfo.password)
        })
    });
}


creatNewOauth2UserVia42 = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            googleId: userInfo.id,
            imageUrl: userInfo.photos[0].value,
            email: userInfo.emails[0].value,
            name: userInfo.displayName,
            password: await getHashPwd(),
            givenName: userInfo.name.givenName,
            familyName: userInfo.name.familyName,
        })
    });
}


module.exports = {
    creatNewRegisterUser,
    creatNewOauth2User,
    creatNewUser,
    creatNewOauth2UserVia42
}