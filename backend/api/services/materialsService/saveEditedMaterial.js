const Material = require('../../models/material');
const utils = require('../utils');
const mongoose = require('mongoose');


fetchVideos = (videos) => {
    return new Promise((resolve, reject) => {
        let listVideos = [];
        let photoPath = "";

        videos.map(video => {
            if (video.mimetype === "video/mp4")
                listVideos.push({
                    videoTitle: video.originalname.substring(0, video.originalname.length - 4),
                    videoLink: video.path
                })
            if (video.mimetype != "video/mp4")
                photoPath = video.path
        })

        resolve({
            videos: listVideos,
            photo: photoPath
        })
    })
}

initVideos = (data) => {
    return new Promise((resolve, reject) => {
        let videos = [];
        let i = 0;

        while (1) {
            if (data["videoTitle" + i] != undefined) {
                if (data["newFile" + i] === undefined)
                    videos.push({
                        comments: [],
                        dislikes: [],
                        likes: [],
                        videoTitle: data["videoTitle" + i],
                        views: [],
                        videoLink: data["videoLink" + i],
                        _id: data["_id" + i],
                    })
                else
                    videos.push({
                        comments: [],
                        dislikes: [],
                        likes: [],
                        videoTitle: data["videoTitle" + i],
                        views: [],
                        videoLink: data["videoLink" + i],
                        newFile: data["newFile" + i],
                    })
            } else {
                resolve(videos)
                break;
            }
            i++;
        }
    })
}

initVideosLink = (videos, files) => {
    return new Promise((resolve, reject) => {
        let i = videos.length;
        let z = 0;
        videos.map(video => {
            if (video.newFile != undefined) {
                files.map(file => {
                    if (file.videoTitle === video.videoTitle)
                        video.videoLink = file.videoLink;
                })
            }
            if (z == i - 1)
                resolve(videos);
            z++;
        })
        resolve(videos);
    })
}

async function saveEditedMaterial(data, res) {
    let files = await fetchVideos(data.files);
    let videos = await initVideos(data.body);
    let allData = data.body;
    let initVideosNewLink = await initVideosLink(videos, files.videos);

    Material.find({
        _id: data.body.materialId
    }).then(material => {
        material[0].videos = initVideosNewLink;
        material[0].title = allData.title;
        material[0].description = allData.description;
        material[0].photo = files.photo != "" ? files.photo : allData.oldPhoto;
        material[0].category = allData.category;
        material[0].dateOfLastUpdate = Date.now();

        Material.findByIdAndUpdate(material[0]._id,
            material[0], {
                new: false,
            },
            function (err, results) {
                if (err) return res.status(500).json(err);
                res.status(200).json({
                    code: 200,
                })
            })
    }).catch(err => utils.defaultError(res, err))

}

module.exports = {
    saveEditedMaterial,
    fetchVideos
}
