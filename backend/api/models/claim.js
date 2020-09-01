let mongoose = require('mongoose');

// Claim schema
let ClaimSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    claimerId: String,
    claimedId: String,
    claimerFullname: String,
    claimCategory: String,
    claimTitle: String,
	claimDescription: String, 
    claimPhoto: String,
    claimPrice: {
        type: Number,
        default: 0
    },
    claimState: {
        type: String,
        default: "In progress"
    },
	claimDeleted: {
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

module.exports = mongoose.model('Claim', ClaimSchema);