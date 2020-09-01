const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const multer = require('multer');
const authCkeck = require('../middleware/check-auth');
const productController = require('../controllers/productController');


//=> End of declared dependencies

/**
 * Multer filter the uplaod file via [POST] and/or [GET] request
 */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // Rename the uplaoded file
        cb(null, new Date().toISOString() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Define the extension of the file
    if (file.mimetype === 'video/mp4' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100024 * 100024 * 5
    },
    fileFilter: fileFilter
});

/*
** [GET] Route:"/products/all/:page" [USED]
*/
router.get('/all/:page', authCkeck, productController.getProductList)

/*
** [POST] Route:"/products/claim/:userId" [USED]
*/
router.post('/claim/:userId', authCkeck, productController.claimProduct)

module.exports = router;