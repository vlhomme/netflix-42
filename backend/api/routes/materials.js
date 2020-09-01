const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const multer = require('multer');
const authCkeck = require('../middleware/check-auth');
const materialController = require('../controllers/materialsController');


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
** [POST] Route:"materials/upload/videos" []USED
*/
router.post('/upload/videos', upload.any(), authCkeck, materialController.uploadMaterials)

/*
** [PUT] Route:"materials/upload/videos" []USED
*/
router.put('/upload/videos', upload.any(), authCkeck, materialController.editUploadedMaterials)

/*
** [POST] Route:"materials/upload/videos/:page" []USED
*/
router.get('/all/:page', authCkeck, materialController.getAllMaterials)

/*
** [POST] Route:"materials/video/:videopath" []USED
*/
router.get('/video/uploads/:videopath', materialController.playVideoStream)

/*
** [GET] Route:"materials/user/:userId/:page" [USED]
*/
router.get('/user/:userId/:page', materialController.getAllMyMaterials)

/*
** [PUT] Route:"materials/delete//:userId/" [USED]
*/
router.put('/delete/:materialId', materialController.removeMyMaterial)

/*
** [PUT] Route:"/materials/views/video" [USED]
*/
router.put('/views/video', materialController.updateVideoViews)

/*
** [PUT] Route:"/materials/likedislike/video" [USED]
*/
router.put('/likedislike/video', materialController.updateVideoLikeDislike)

/*
** [GET] Route:"/materials/filteredbycategory/:catId/:page" [USED]
*/
router.get('/filteredbycategory/:catId/:page', materialController.getFilteredMaterialsByCatId)

module.exports = router;