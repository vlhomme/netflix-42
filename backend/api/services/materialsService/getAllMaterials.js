const Material = require('../../models/material');
const utils = require('../utils');

countAllMaterials = () => {
    return new Promise((resolve, reject) => {
        Material.find({
            materialDeleted: false
        })
            .exec()
            .then(materials => {
                resolve(materials.length);
            }).catch(err => console.log("countAllMaterials ERR : ", err))
    })
}

async function listAllMaterials(res, page) {
    Material.find({
        materialDeleted: false
    })
        .sort('dateOfCreation')
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async materials => {
            console.log("test")
            let materialsCount = await countAllMaterials();
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
    listAllMaterials,
    countAllMaterials
}