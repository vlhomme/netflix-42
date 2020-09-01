let mongoose = require('mongoose');

// JwtToken schema
let JwtTokenSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_id: String,
	token: String,
    accessToken: String,
    tokenDeleted: {
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

module.exports = mongoose.model('JwtToken', JwtTokenSchema);