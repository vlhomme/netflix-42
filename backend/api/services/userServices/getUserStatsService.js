const User = require('../../models/user')
const utils = require('../utils')
const Material = require('../../models/material');
const Category = require('../../models/category');
const Wallet = require("../../models/wallet");
const mongoose = require('mongoose');

countUploadedMaterials = (res) => {
    return new Promise((resolve, reject) => {
        Material.find({
            materialDeleted: false,
        }).exec()
            .then(Materials => resolve(Materials.length))
            .catch(err => utils.defaultError(res, err))
    })
}

countAllCategories = (res) => {
    return new Promise((resolve, reject) => {
        Category.find({
            CategoryDeleted: false,
        })
            .exec()
            .then(cats => resolve(cats.length))
            .catch(err => utils.defaultError(res, err))
    })
}

allMembers = (res) => {
    return new Promise((resolve, reject) => {
        User.find({
            blocked: false
        }).exec()
            .then(users => resolve(users.length))
            .catch(err => utils.defaultError(res, err))
    })
}

uploadUserCoins = (res, userId) => {
    return new Promise((resolve, reject) => {
        Material.find({
            "uploadedBy.userId": userId,
            materialDeleted: false,
        }).exec()
            .then(Materials => resolve(Materials.length))
            .catch(err => utils.defaultError(res, err))
    })
}

userViewsTCoin = (res, userId) => {
    return new Promise((resolve, reject) => {
        Material.find({
            materialDeleted: false,
            "videos.views": [userId]
        }).exec()
            .then(materials => {
                let count = 0;
                if (materials.length > 0) {
                    materials.map(material => {
                        material.videos.map(video => {
                            video.views.map(key => {
                                if (key == userId)
                                    count++;
                            })
                        })
                    })
                    resolve(count);
                } else
                    resolve(materials.length)
            })
            .catch(err => utils.defaultError(res, err))
    })
}

userLikes = (res, userId) => {
    return new Promise((resolve, reject) => {
        Material.find({
            materialDeleted: false,
            "videos.likes": {
                "$in": userId
            }
        }).exec()
            .then(materials => {
                let count = 0;
                if (materials.length > 0) {
                    materials.map(material => {
                        material.videos.map(video => {
                            if (video.likes.indexOf(userId) != -1)
                                count++;
                        })
                    })
                    resolve(count);
                } else
                    resolve(materials.length)
            })
            .catch(err => utils.defaultError(res, err))
    })
}

userDislikes = (res, userId) => {
    return new Promise((resolve, reject) => {
        Material.find({
            materialDeleted: false,
            "videos.dislikes": {
                "$in": userId
            }
        }).exec()
            .then(materials => {
                let count = 0;
                if (materials.length > 0) {
                    materials.map(material => {
                        material.videos.map(video => {
                            if (video.dislikes.indexOf(userId) != -1)
                                count++;
                        })
                    })
                    resolve(count);
                } else
                    resolve(materials.length)

            })
            .catch(err => utils.defaultError(res, err))
    })
}

userMylikedMaterials = (res, userId) => {
    return new Promise((resolve, reject) => {
        Material.find({
            "uploadedBy.userId": userId,
            materialDeleted: false,
            "videos.likes": {
                "$in": userId
            }
        }).exec()
            .then(materials => {
                let count = 0;
                if (materials.length > 0) {
                    materials.map(material => {
                        material.videos.map(video => {
                            if (video.likes.indexOf(userId) != -1)
                                count++;
                        })
                    })
                    resolve(count);
                } else
                    resolve(materials.length)
            })
            .catch(err => utils.defaultError(res, err))
    })
}

async function getUserStats(userId, res) {
    let countMaterials = await countUploadedMaterials(res);
    let countCategories = await countAllCategories(res);
    let countMemebers = await allMembers(res);
    let countMyView = await userViewsTCoin(res, userId);
    let countMyLikedMaterials = await userMylikedMaterials(res, userId);

    res.status(200).json({
        code: 200,
        countMyLikedMaterials,
        countMyView,
        countMemebers,
        countCategories,
        countMaterials
    })
}

module.exports = {
    getUserStats
}