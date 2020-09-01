const User = require('../../models/user')
const utils = require('../utils')

countAllmembers = () => {
    return new Promise((resolve, reject) => {
        User.find({
            blocked: false
        })
            .exec()
            .then(users => {
                resolve(users.length);
            }).catch(err => console.log("countAllmembers ERR : ", err))
    })
}

async function listAlluser(res, page) {
    User.find({ blocked: false })
        .sort('dateOfCreation')
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async members => {
            let membersCount = await countAllmembers();
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
    listAlluser
}