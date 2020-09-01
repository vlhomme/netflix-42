const Category = require('../../models/category');
const utils = require('../utils');


getAllCategories = (res) => {
    Category.find({
        CategoryDeleted: false,
    }).exec()
        .then(categories => {
            res.status(200).json({
                code: 200,
                data: categories
            })
        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    getAllCategories    
}