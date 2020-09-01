const Product = require('../../models/Product');
const utils = require('../utils')

initEditbaleProduct = (data, photo) => {
    return new Promise((resolve, reject) => {
        Product.find({
            _id: data.productId
        }).exec()
            .then(product => {
                product[0].productTitle = data.productTitle;
                product[0].productDescription = data.productDescription;
                product[0].productPhoto = photo
                product[0].productPrice = data.productPrice;
                product[0].productStatus = data.productStatus;
                resolve(product)
            })
            .catch(err => utils.defaultError(res, err))
    })
}

async function editProduct(req, res) {
    let data = req.body;
    let photo = req.body.productPhoto;
    if (data.photoChanged === 'true')
        photo = req.files[0].path;
    let product = await initEditbaleProduct(data, photo)
    Product.findByIdAndUpdate(product[0]._id,
        product[0], {
            new: false,
        },
        function (err, results) {
            if (err) return res.status(500).json(err);
            res.status(200).json(200)
        })

}

module.exports = {
    editProduct
}