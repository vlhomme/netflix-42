const Material = require('../../models/material');
const utils = require('../utils');


removeUserMaterial = (res, materialId) => {

    Material.find({
        _id: materialId,
        materialDeleted: false,
    }).then(material => {
        if (material.length === 0)
            res.status(500);
        else {
            material[0].materialDeleted = true;
            Material.findByIdAndUpdate(material[0]._id,
                material[0], {
                    new: false,
                },
                function (err, results) {
                    if (err) return res.status(500).json(err);
                    res.status(200).json({
                        code: 200,
                        msg: "success"
                    });
                })
        }
    }).catch(err => utils.defaultError(res, err))
}

module.exports = {
    removeUserMaterial
}