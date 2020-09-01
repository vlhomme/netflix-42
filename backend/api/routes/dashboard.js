const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const multer = require('multer');
const authCkeck = require('../middleware/check-auth');
const dashboardController = require('../controllers/dashboardController');
const checkUser = require('../middleware/checkUserRole');

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
** [GET] Route:"dashboard/all/users/:userId/:page" [USED]
*/
router.get('/all/users/:userId/:page', authCkeck, checkUser.checkUserRole, dashboardController.getAllUsersDash);

/*
** [GET] Route:"dashboard/list/categories/:userId/:page" [USED]
*/
router.get('/list/categories/:userId/:page', authCkeck, checkUser.checkUserRole, dashboardController.getAllCategoriesDash);

/*
** [PUT] Route:"dashboard/user/:userId" [USED]
*/
router.put('/user/:userId', authCkeck, checkUser.checkUserRole, dashboardController.updateUserDash);

/*
** [POST] Route:"dashboard/category/:userId" [USED]
*/
router.post('/category/:userId', authCkeck, checkUser.checkUserRole, dashboardController.addCategoryDash);

/*
** [POST] Route:"dashboard/product/:userId" [USED]
*/
router.post('/product/:userId', upload.any(), authCkeck, checkUser.checkUserRole, dashboardController.addProdcutToStoreDash);

/*
** [GET] Route:"dashboard/list/products/:userId/:page" [USED]
*/
router.get('/list/products/:userId/:page', authCkeck, checkUser.checkUserRole, dashboardController.getAllProductsDash);

/*
** [PUT] Route:"dashboard/category/:userId/:page" [USED]
*/
router.put('/category/:userId', authCkeck, checkUser.checkUserRole, dashboardController.editCategoryDash);

/*
** [PUT] Route:"dashboard/product/:userId" [USED]
*/
router.put('/product/:userId', upload.any(), authCkeck, checkUser.checkUserRole, dashboardController.editProductDash);

/*
** [PUT] Route:"dashboard/category/:userId/:catId" [USED]
*/
router.put('/remove/category/:userId/:catId', authCkeck, checkUser.checkUserRole, dashboardController.removeCatgeoryDash);

/*
** [PUT] Route:"dashboard/remove/product/:userId/:productId" [USED]
*/
router.put('/remove/product/:userId/:productId', authCkeck, checkUser.checkUserRole, dashboardController.removeProductDash);

/*
** [GET] Route:"dashboard/claims/:userId/:page" [USED]
*/
router.get('/claims/:userId/:page', authCkeck, checkUser.checkUserRole, dashboardController.getClaimsListDash);

/*
** [PUT] Route:"dashboard/claim/:userId" [USED]
*/
router.put('/claim/:userId', authCkeck, checkUser.checkUserRole, dashboardController.editUserClaimDash);

module.exports = router;