var mongoose = require('mongoose');

// Set the path to the database
if (process.env.NODE_ENV == "dev") {
    mongoose.connect('mongodb://'+ process.env.DB_HOST + '/' + process.env.DB_NAME);
} else if (process.env.NODE_ENV == "preprod") {
    mongoose.connect('mongodb://'+ process.env.DB_USERSERVER + ':' + process.env.DB_PSW + process.env.DB_HOSTSERVER);
}


let db = mongoose.connection;

let DB = module.exports = db;