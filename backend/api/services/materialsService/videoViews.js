const Material = require('../../models/material');
const utils = require('../utils');
const Wallet = require("../../models/wallet");

getMaterialViews = (id) => {
    return new Promise((resolve, reject) => {
        Material.find({
            _id: id
        }).then(material => resolve(material))
    }).catch(err => utils.defaultError(res, err))
}

incrementViews = (userId) => {
    return new Promise((resolve, reject) => {
        Wallet.find({
            userId: userId
        }).then(wallet => {
            if (wallet.length > 0) {
                wallet[0].views = wallet[0].views + 1;
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

async function initVideoViews (material, vdId, userId) {
    return new Promise(async (resolve, reject) => {
        let i = material.videos.length - 1;
        let z = 0;
        await incrementViews(userId);
        
        material.videos.map(video => {
            if (video._id == vdId)
                video.views.push(userId);

            if (i === z)
                resolve(material)
            z++;
        })
    })
}

async function videoUpdateViews(data, res) {
    let material = await getMaterialViews(data.materialId);
    let initVideoView = await initVideoViews(material[0], data.videoId, data.userId);
    Material.findByIdAndUpdate(initVideoView._id,
        initVideoView, {
            new: false,
        },
        function (err, results) {
            if (err) return res.status(500).json(err);
            res.status(200).json({
                code: 200,
            })
        })
}

module.exports = {
    videoUpdateViews
}