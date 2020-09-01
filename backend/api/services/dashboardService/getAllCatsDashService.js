const Category = require('../../models/category');
const utils = require('../utils');

countAllCats = () => {
    return new Promise((resolve, reject) => {
        Category.find({
            CategoryDeleted: false
        })
            .exec()
            .then(cats => {
                resolve(cats.length);
            }).catch(err => console.log("countAllCats ERR : ", err))
    })
}

getCategoriesDash = (res, page) => {
    Category.find({
        CategoryDeleted: false
    })
    .sort('dateOfCreation')
    .skip(Number(page * 10))
    .limit(Number(10))
    .exec()
    .then(async cats => {
        let categoryCount = await countAllCats();
        res.status(200).json({
            Count: categoryCount,
            per_page: 10,
            total: categoryCount,
            total_pages: Math.floor(categoryCount / 10),
            data: cats,
            code: 200,
            msg: "ok"
        })
    })
    .catch(err => utils.defaultError(res, err))
}

module.exports = {
    getCategoriesDash
}