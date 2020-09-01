const productService = require('../services/productService/index');

getProductList = (req, res, next) => {
    let page = req.params.page;
    productService.getAllProductsService.getAllProducts(res, page);
}

claimProduct = (req, res, next) => {
    let userId = req.params.userId;
    productService.claimUserProductService.claimUserProduct(res, req.body, userId);
}

module.exports = {
    getProductList,
    claimProduct
}