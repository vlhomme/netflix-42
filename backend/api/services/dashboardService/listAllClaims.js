const Claim = require('../../models/claim');
const utils = require('../utils');

countAllClaims = () => {
    return new Promise((resolve, reject) => {
        Claim.find({
            claimDeleted: false
        })
            .exec()
            .then(claims => {
                resolve(claims.length);
            }).catch(err => console.log("countAllClaims ERR : ", err))
    })
}

async function listAllClaims(page, res) {
    Claim.find({
        claimDeleted: false
    })
        .sort({ 'dateOfLastUpdate': -1 })
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async claims => {
            let claimCount = await countAllClaims();
            res.status(200).json({
                Count: claimCount,
                per_page: 10,
                total: claimCount,
                total_pages: Math.floor(claimCount / 10),
                data: claims,
                code: 200,
                msg: "ok"
            })
        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    listAllClaims
}