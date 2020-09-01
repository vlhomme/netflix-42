let mongoose = require('mongoose');

// Product schema
let ProductSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	productTitle: String,
	productDescription: String, 
	productPhoto: String,
	productPrice: String,
	productStatus: {
        type: String,
        default: "In stock",
    },
	productDeleted: {
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

module.exports = mongoose.model('Product', ProductSchema);