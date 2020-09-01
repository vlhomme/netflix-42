const Category = require('../../models/category');
const utils = require('../utils');
const mongoose = require('mongoose');

initCategory = (name) => {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            categoryTitle: name,
            categoryDescription: "",
            categoryPhoto: "",
        })
    })
}

checkIfNameexist = (name, res) => {
    return new Promise((resolve, reject) => {
        Category.find({
            categoryTitle: name,
            CategoryDeleted: false,
        }).exec()
        .then(cat => {
            if (cat.length === 0)
                resolve(true)
            else
                resolve(false)
        }).catch(err => utils.defaultError(res, err))
    })
}

async function addCategory(data, res, next) {
    if (await checkIfNameexist(data.name, res)) {
        let category = new Category(await initCategory(data.name));
        category.save()
        .then(results => {
            res.status(200).json(200)
        }).catch(err => utils.defaultError(res, err))
    } else {
        res.status(200).json(203)
    }
}

module.exports = {
    addCategory
}