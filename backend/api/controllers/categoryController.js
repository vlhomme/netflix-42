const mongoose = require('mongoose');
const utils = require('../services/utils');
const categoryService = require('../services/categoryService/listCategoriesService');

getCategoriesList = (req, res, next) => {
    categoryService.getAllCategories(res);
}


module.exports = {
    getCategoriesList
}
