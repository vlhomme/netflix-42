const service = require('./index');

uploadMaterials = (req, res, next) => {
    service.materialsService.saveMaterial(req, res)
}

getAllMaterials = (req, res, next) => {
    let page = req.params.page;

    service.listAllMaterials.listAllMaterials(res, page);
}

playVideoStream = (req, res, next) => {
    let videoPath = req.params.videopath;
    let fullPath = 'uploads/' + videoPath;
    service.playVideo.playVideo(fullPath, res, req);
}

getAllMyMaterials = (req, res, next) => {
    let page = req.params.page;
    let userId = req.params.userId;

    service.listAllMyMaterials.listAllMyMaterials(res, page, userId);
}

removeMyMaterial = (req, res, next) => {
    let materialId = req.params.materialId;

    service.removeUserMaterial.removeUserMaterial(res, materialId);
}

editUploadedMaterials = (req, res, next) => {
    service.saveEditedMaterial.saveEditedMaterial(req, res)    
}

updateVideoViews = (req, res, next) => {
    service.videoData.videoUpdateViews(req.body.data, res)    
}

updateVideoLikeDislike = (req, res, next) => {
    service.videoDataLikeDislike.videoUpdateLikeDislike(req.body.data, res)    
}

getFilteredMaterialsByCatId = (req, res, next) => {
    let catId = req.params.catId;
    let page = req.params.page;

    service.filterMaterials.filterByCategoryId(catId, page, res);
}

module.exports = {
    getFilteredMaterialsByCatId,
    updateVideoLikeDislike,
    updateVideoViews,
    editUploadedMaterials,
    removeMyMaterial,
    getAllMyMaterials,
    uploadMaterials,
    playVideoStream,
    getAllMaterials
}
