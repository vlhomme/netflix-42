const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const multer = require('multer');
const authCkeck = require('../middleware/check-auth');
const moviesContraoller = require('../controllers/moviesContraoller');


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
** [POST] Route:"/movies/save" [USED]
*/
router.post('/save/:userId', authCkeck, moviesContraoller.saveMovieCOntroller)


/*
** [POST] Route:"/movies/stream/:magnet/:file_name" [USED]
*/
router.get('/stream/:torrentId', moviesContraoller.streamMovieCOntroller)

/*
** [POST] Route:"/movies/comment/save" [USED]
*/
router.post('/comment/save/:userId', moviesContraoller.saveCommentCOntroller)

/*
** [GET] Route:"/movies/comments/:movieId" [USED]
*/
router.get('/comments/:movieId', moviesContraoller.getCommentCOntroller)

/*
** [GET] Route:"/movies/views/:userId" [USED]
*/
router.get('/views/:userId', moviesContraoller.getCOntroller)

module.exports = router;