const Material = require('../../models/material');
const utils = require('../utils');

countAllMyMaterials = (userId) => {
    return new Promise((resolve, reject) => {
        Material.find({
            materialDeleted: false,
            "uploadedBy.userId": userId
        })
            .exec()
            .then(materials => {
                resolve(materials.length);
            }).catch(err => console.log("countAllMyMaterials ERR : ", err))
    })
}

async function listAllMyMaterials(res, page, userId) {
    Material.find({
        materialDeleted: false,
        "uploadedBy.userId": userId
    })
        .sort('dateOfCreation')
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async materials => {
            let materialsCount = await countAllMyMaterials(userId);
            res.status(200).json({
                Count: materialsCount,
                per_page: 10,
                total: materialsCount,
                total_pages: Math.floor(materialsCount / 10),
                data: materials,
                code: 200,
                msg: "ok"
            })
        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    listAllMyMaterials,
    countAllMyMaterials
}