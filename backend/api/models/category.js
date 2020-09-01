let mongoose = require('mongoose');

// Category schema
let CategorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	categoryTitle: String,
	categoryDescription: String, 
	categoryPhoto: String,
	CategoryDeleted: {
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

module.exports = mongoose.model('Category', CategorySchema);