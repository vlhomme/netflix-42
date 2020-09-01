let mongoose = require('mongoose');

// Notification schema
let NotificationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	notificationTitle: String,
	userId: String, 
    requestId: String,
    notificationCategory: String,
    notificationStatus: {
        type: String,
        default: "in progress"
    },
    notificationSeen: {
        type: Number,
        default: 0
    },
	notificationDeleted: {
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

module.exports = mongoose.model('Notification', NotificationSchema);