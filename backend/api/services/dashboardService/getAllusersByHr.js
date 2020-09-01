const User = require('../../models/user')
const utils = require('../utils')

countAllmembersDash = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .exec()
            .then(users => {
                resolve(users.length);
            }).catch(err => console.log("countAllmembers ERR : ", err))
    })
}

async function getMembersDash (res, page) {
    User.find()
    .sort('dateOfCreation')
    .skip(Number(page * 10))
    .limit(Number(10))
    .exec()
    .then(async members => {
        let membersCountDash = await countAllmembersDash();
        res.status(200).json({
            Count: membersCountDash,
            per_page: 10,
            total: membersCountDash,
            total_pages: Math.floor(membersCountDash / 10),
            data: members,
            code: 200,
            msg: "ok"
        })
    })
    .catch(err => utils.defaultError(res, err))
}

module.exports = {
    getMembersDash
}