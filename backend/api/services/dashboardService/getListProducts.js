const Product = require('../../models/Product');
const utils = require('../utils');

countAllProducts = () => {
    return new Promise((resolve, reject) => {
        Product.find({
            productDeleted: false
        })
            .exec()
            .then(products => {
                resolve(products.length);
            }).catch(err => console.log("countAllCats ERR : ", err))
    })
}

async function getListProducts(res, page) {
    Product.find({
        productDeleted: false
    })
        .sort({ 'dateOfLastUpdate': -1 })
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async products => {
            let productCount = await countAllProducts();
            res.status(200).json({
                Count: productCount,
                per_page: 10,
                total: productCount,
                total_pages: Math.floor(productCount / 10),
                data: products,
                code: 200,
                msg: "ok"
            })
        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    getListProducts
}