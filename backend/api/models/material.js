let mongoose = require('mongoose');

// Material schema
let MaterialSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: String,
	description: String, 
	photo: String,
	videos: [{
        videoTitle: String,
		videoLink: String,
		views: [],
		likes: [],
		dislikes: [],
		comments: [],
	}],
	uploadedBy: {
		userId: String,
		userFullname: String,
	},
	category: String,
    materialDeleted: {
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

module.exports = mongoose.model('Material', MaterialSchema);