const utils = require('../utils')
const Product = require('../../models/Product');

async function removeProduct(productId, res) {
    console.log("test :", productId);
    Product.find({
        _id: productId
    }).exec()
        .then(product => {
            if (product.length > 0) {
                product[0].productDeleted = true;
                product[0].dateOfLastUpdate = Date.now;
                Product.findByIdAndUpdate(product[0]._id,
                    product[0], {
                        new: false,
                    },
                    function (err, results) {
                        if (err) return res.status(500).json(err);
                        res.status(200).json(200)
                    })
            } else
                res.status(500)
        })
        .catch(err => utils.defaultError(res, err))

}

module.exports = {
    removeProduct
}