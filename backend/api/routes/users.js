const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const multer = require('multer');
const authCkeck = require('../middleware/check-auth');
const userController = require('../controllers/userController');
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

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
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Define the extension of the file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/*
** [POST] Route:"/users/login" [USED]
*/

router.post('/login', userController.loginUser)

/*
** [PUT] Route:"/users/profile" [USED]
*/
router.put('/profile', upload.any(), authCkeck, userController.userProfile)

/*
** [PUT] Route:"/users/profile/:userId" [USED]
*/
router.get('/profile/:userId', authCkeck, userController.getUserProfileInfo)

/*
** [GET] Route:"/users/all/:page" [USED]
*/
router.get('/all/:page', authCkeck, userController.getAllusers);

/*
** [GET] Route:"/users/stats/:userId" [USED]
*/
router.get('/stats/:userId', authCkeck, userController.getUserStats);

/*
** [GET] Route:"/users/all/filtered/:userId" [USED]
*/
router.get('/all/filtered/:catId/:page', authCkeck, userController.getAllFilteredUsers);

/*
** [GET] Route:"/users/wallet/:userId" [USED]
*/
router.get('/wallet/:userId', authCkeck, userController.getMyWalletTcoin);

/*
** [GET] Route:"/users/notifications/:userId/:page" [USED]
*/
router.get('/notifications/:userId/:page', authCkeck, userController.getUserNotifications);

/*
** [PUT] Route:"/users/notifications/:userId" [USED]
*/
router.put('/notifications/:userId', authCkeck, userController.updateUserNotifications);

/*
** [POST] Route:"/users/signup" [USED]
*/
router.post('/signup', upload.any(), userController.registerNewUserControl);

/*
** [POST] Route:"/users/loginform" [USED]
*/
router.post('/loginform', userController.loginformUserControl);

/*
** [POST] Route:"/users/resetpwd" [USED]
*/
router.post('/resetpwd', userController.resetpwdControl);

module.exports = router;