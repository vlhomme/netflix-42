const Category = require('../../models/category');
const User = require('../../models/user')
const utils = require('../utils')

getCatLabel = (catId, res) => {
    return new Promise((resolve, reject) => {
        Category.find({
            _id: catId
        }).then(cat => {
            resolve(cat[0].categoryTitle);
        })
    }).catch(err => utils.defaultError(res, err))
}

countAllFilteredmembers = (catLabel) => {
    return new Promise((resolve, reject) => {
        User.find({
            "skills.label": { $exists: true, $in: [catLabel] }
        })
            .exec()
            .then(users => {
                resolve(users.length);
            }).catch(err => console.log("countAllmembers ERR : ", err))
    })
}

async function getFilteredMembers(res, catId, page) {
    // get cat name
    let catLabel = await getCatLabel(catId, res);
    User.find({
        "skills.label": { $exists: true, $in: [catLabel] }
    })
        .sort('dateOfCreation')
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async members => {
            let membersCount = await countAllFilteredmembers(catLabel);
            res.status(200).json({
                Count: membersCount,
                per_page: 10,
                total: membersCount,
                total_pages: Math.floor(membersCount / 10),
                data: members,
                code: 200,
                msg: "ok"
            })
        })
        .catch(err => utils.defaultError(res, err))

}

module.exports = {
    getFilteredMembers
}