const User = require('../../models/user')
const utils = require('../utils')

getUserInfoDash = (userId, res) => {
    return new Promise((resolve, reject) => {
        User.find({
            _id: userId
        }).exec()
        .then(user => resolve(user[0]))
        .catch(err => utils.defaultError(res, err))
    })
}

async function updateMemeberDash(data, res) {
    console.log("data => --> ", data);
    let member = await getUserInfoDash(data.id, res)
    if (data.role != "")
        member.role = data.role;
    if (data.blocked != "") {
        data.blocked === "true" ?
        member.blocked = true :
        member.blocked = false
    }
    User.findByIdAndUpdate(member._id,
        member, {
            new: false,
        },
        function (err, results) {
            if (err) return res.status(500).json(err);
            res.status(200).json(200)
        })
}

module.exports = {
    updateMemeberDash
}