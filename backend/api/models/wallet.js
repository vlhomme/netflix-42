let mongoose = require('mongoose');

// Wallet schema
let WalletSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    userId: String,
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    walletValue: {
        type: Number,
        default: 0,
    },
    walletValueUsed: {
        type: Number,
        default: 0,
    },
	walletDeleted: {
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

module.exports = mongoose.model('Wallet', WalletSchema);