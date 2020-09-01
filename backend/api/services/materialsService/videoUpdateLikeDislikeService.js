const Material = require('../../models/material');
const utils = require('../utils');
const Wallet = require('../../models/wallet');

getMaterial = (id) => {
    return new Promise((resolve, reject) => {
        Material.find({
            _id: id
        }).then(material => resolve(material))
    }).catch(err => utils.defaultError(res, err))
}

incDecrementLikeDislike = (userId, value) => {
    return new Promise((resolve, reject) => {
        Wallet.find({
            userId: userId
        }).then(wallet => {
            if (wallet.length > 0) {
                if (value === 0)
                    wallet[0].likes = wallet[0].likes + 1;
                else if (value === 1)
                    wallet[0].likes = wallet[0].likes - 1;
                else if (value === 2)
                    wallet[0].dislikes = wallet[0].dislikes + 1;
                else if (value === 3)
                    wallet[0].dislikes = wallet[0].dislikes - 1;
                wallet[0].dateOfLastUpdate = Date.now;
                Wallet.findByIdAndUpdate(wallet[0]._id,
                    wallet[0], {
                        new: false,
                    },
                    function (err, results) {
                        if (err) return res.status(500).json(err);
                        resolve(true);
                    })
            } else {
                resolve(true)
            }
        })
    })
}


initVideo = (material, vdId, userId, dislike, like, index) => {
    return new Promise(async (resolve, reject) => {
        if (like === true) {
            if (material.videos[index].likes.indexOf(userId) === -1) {
                incDecrementLikeDislike(userId, 0);
                material.videos[index].likes.push(userId);
                resolve(material)
            } else {
                incDecrementLikeDislike(userId, 1)
                material.videos[index].likes.splice(material.videos[index].likes.indexOf(userId), 1);
                resolve(material)
            }
        }

        if (dislike === true) {
            if (material.videos[index].dislikes.indexOf(userId) === -1) {
                incDecrementLikeDislike(userId, 2)
                material.videos[index].dislikes.push(userId);
                resolve(material)
            } else {
                incDecrementLikeDislike(userId, 3)
                material.videos[index].dislikes.splice(material.videos[index].dislikes.indexOf(userId), 1);
                resolve(material)
            }
        }
    })
}

async function videoUpdateLikeDislike(data, res) {
    let material = await getMaterial(data.materialId);
    let dateNow = Date.now();
    let initVideoView = await initVideo(material[0], data.videoId, data.userId, data.dislike, data.like, data.index)
    Material.findByIdAndUpdate(initVideoView._id,
        initVideoView, {
            new: false,
        },
        function (err, results) {
            if (err) return res.status(500).json(err);
            res.status(200).json({
                code: 200,
                msg: "success"
            });
        })
}

module.exports = {
    videoUpdateLikeDislike
}