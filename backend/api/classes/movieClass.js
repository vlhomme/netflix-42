const mongoose = require('mongoose');

async function saveMovieMockup(data, magnet) {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            torrent_id: data.id,
            title: data.title_long,
            year: data.year,
            rating: data.rating,
            videoName: data.title_long,
            imdb_code: data.imdb_code,
            genres: data.genres,
            magnetUrl: magnet,
            summary: data.summary,
            yt_trailer_code: data.yt_trailer_code,
            language: data.language,
            torrents: data.torrents,
            description: data.description, 
            background_image_original: data.background_image_original,
            large_cover_image: data.large_cover_image,
            date_uploaded: data.date_uploaded,
            videosUrl: "",
        })
    })
}

module.exports = {
    saveMovieMockup
}