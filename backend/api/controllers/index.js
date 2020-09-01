const materialsService = require('../services/materialsService/uploadMaterialsService');
const listAllMaterials = require('../services/materialsService/getAllMaterials');
const playVideo = require('../services/materialsService/playMaterialVideo');
const listAllMyMaterials = require('../services/materialsService/getAllMyMaterials');
const removeUserMaterial = require('../services/materialsService/deleteMyMaterial');
const saveEditedMaterial = require('../services/materialsService/saveEditedMaterial')
const videoData = require('../services/materialsService/videoViews'); 
const videoDataLikeDislike = require('../services/materialsService/videoUpdateLikeDislikeService');
const filterMaterials = require('../services/materialsService/filterMaterials');

module.exports = {
    videoData,
    filterMaterials,
    filterMaterials,
    videoDataLikeDislike,
    materialsService,
    saveEditedMaterial,
    playVideo,
    listAllMyMaterials,
    listAllMaterials,
    removeUserMaterial
}