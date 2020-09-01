const Material = require('../../models/material');
const utils = require('../utils');
const mongoose = require('mongoose');


fetchVideosInfo = (videos) => {
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

iniNewtVideosUploaded = (data) => {
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
        i = 0;
    })
}

initUploadedVideosLink = (videos, files) => {
    return new Promise((resolve, reject) => {
        let i = videos.length;
        let z = 0;
        videos.map((video, index) => {
            if (video.newFile != undefined) {
                video.videoLink = files[index].videoLink;
            }
            if (z == i - 1)
                resolve(videos);
            z++;
        })
        resolve(videos);
    })
}

initMaterialModel = (data, videos, photo) => {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            title: data.title,
            description: data.description,
            photo: photo,
            videos: videos,
            uploadedBy: {
                userId: data.userId,
                userFullname: data.givenName + " " + data.familyName,
            },
            category: data.category,
        })
    })

}


async function saveMaterial(data, res) {
    let files = await fetchVideosInfo(data.files);
    let videos = await iniNewtVideosUploaded(data.body);
    let allData = data.body;
    let initVideosNewLink = await initUploadedVideosLink(videos, files.videos);

    let material = new Material(await initMaterialModel(allData, initVideosNewLink, files.photo));
    material.save()
    .then(results => {
        res.status(200).json({
            code: 200,
            msg: "Material uploaded with success"
        })
    }).catch(err => utils.defaultError(res, err))
}


module.exports = {
    saveMaterial,
    fetchVideosInfo
}
