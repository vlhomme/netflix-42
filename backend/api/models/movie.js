let mongoose = require('mongoose');

// Movie schema
let MovieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    torrent_id: String,
    title: String,
    year: String,
    imdb_code: String,
    rating: String,
    genres: [],
    summary: String,
    subTitlesArr: [],
    yt_trailer_code: String,
    language: String,
    torrents: [],
	description: String, 
    background_image_original: String,
    large_cover_image: String,
    date_uploaded: String,
    videosUrl: String,
    magnetUrl: String,
    videoName: String,
    compelition: {
        type: Number,
        default: 0,
    },
    MovieDeleted: {
        type: Boolean,
        default: false,
    },
    dateOfCreation: {
		type: Date,
		default: Date.now,
	},
	dateOfLastUpdate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Movie', MovieSchema);