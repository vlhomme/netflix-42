const Category = require('../models/category')
const mongoose = require('mongoose');

const listCategory = [
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Adventure",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Animation",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Biography",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Crime",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Documentary",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Drama",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Family",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Fantasy",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "History",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Horror",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Music",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Musical",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Mystery",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Romance",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Sci-Fi",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Sport",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Thriller",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "War",
        categoryDescription: "",
        categoryPhoto: "",
    },
    {
        _id: new mongoose.Types.ObjectId,
        categoryTitle: "Western",
        categoryDescription: "",
        categoryPhoto: "",
    }
];

generateCategoryData = () => {
    Category.find()
        .exec()
        .then(categories => {
            if (categories.length == 0) {
                listCategory.map(cat => {
                    let categorisModel = new Category(cat);
                    categorisModel.save();
                })
            }
        }).catch(err => console.log("generateCategoryData ERR : ", err))
}

module.exports = {
    generateCategoryData,
    listCategory,
}