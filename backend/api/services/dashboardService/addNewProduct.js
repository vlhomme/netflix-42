const Product = require('../../models/Product');
const mongoose = require('mongoose');
const utils = require('../utils');

initProduct = (data, photo) => {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            productTitle: data.productTitle,
            productDescription: data.productDescription,
            productPhoto: photo,
            productPrice: data.productPrice,
        })
    })
}

async function addNewProduct(req, res) {
    let data = req.body;
    let photo = "";
    if (req.files.length > 0)
        photo = req.files[0].path

    let product = new Product(await initProduct(data, photo));
    product.save()
        .then(results => {
            res.status(200).json(200)
        }).catch(err => utils.defaultError(res, err))
}

module.exports = {
    addNewProduct
}