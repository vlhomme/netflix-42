const getMembersDash = require('./getAllusersByHr');
const getCatsDash = require('./getAllCatsDashService');
const updateUserDash = require('./updateMemeberDash');
const addCatDash = require('./addCategory');
const addProdcutDash = require('./addNewProduct');
const getListProductsDash = require("./getListProducts")
const editCategoryValueDash = require("./editCategoy")
const editProductValueDash = require("./editProduct")
const removeCatgeoryServiceDash = require('./removeCatgeory');
const removeProductServiceDash = require('./removeProduct')
const listAllClaimsServiceDash = require('./listAllClaims')
const editClaimsServiceDash = require('./editClaimsServiceDash');

module.exports = {
    editClaimsServiceDash,
    listAllClaimsServiceDash,
    removeProductServiceDash,
    removeCatgeoryServiceDash,
    editProductValueDash,
    editCategoryValueDash,
    getListProductsDash,
    addCatDash,
    addProdcutDash,
    getMembersDash,
    getCatsDash,
    updateUserDash

}