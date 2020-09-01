const Product = require('../../models/Product');

countAllProducts = () => {
    return new Promise((resolve, reject) => {
        Product.find({
            productDeleted: false
        })
            .exec()
            .then(products => {
                resolve(products.length);
            }).catch(err => console.log("countAllProducts ERR : ", err))
    })
}

async function getAllProducts(res, page) {
    Product.find({
        productDeleted: false
    })
        .sort({ 'dateOfLastUpdate': -1 })
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async materials => {
            let productCount = await countAllProducts();
            res.status(200).json({
                Count: productCount,
                per_page: 10,
                total: productCount,
                total_pages: Math.floor(productCount / 10),
                data: materials,
                code: 200,
                msg: "ok"
            })
        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    getAllProducts
}