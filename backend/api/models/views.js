let mongoose = require('mongoose');

// view schema
let viewSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    movieId: String,
    userId: String,
    viewDeleted: {
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

module.exports = mongoose.model('view', viewSchema);