const utils = require('../utils')
const Category = require('../../models/category');

async function editCategoy(data, res) {
    Category.find({
        _id: data.id
    }).exec()
        .then(cat => {
            if (cat.length > 0) {
                cat[0].categoryTitle = data.name;
                cat[0].dateOfLastUpdate = Date.now;
                Category.findByIdAndUpdate(cat[0]._id,
                    cat[0], {
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
    editCategoy
}