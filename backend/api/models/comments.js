let mongoose = require('mongoose');

// Comment schema
let CommentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    movieId: String,
    userId: String,
    userImage: String,
    commentContent: String,
    userFullName: String,
    CommentDeleted: {
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

module.exports = mongoose.model('Comment', CommentSchema);