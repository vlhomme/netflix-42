const User = require('../../models/user')
const utils = require('../utils')
const jwt = require('jsonwebtoken');
const userClass = require('../../classes/userClass');

formatSelectedSkills = (skills) => {
    return new Promise((resolve, reject) => {
        let formatedSkills = [];
        skills.map(skill => {
            formatedSkills.push({
                label: skill.label,
                value: skill.id
            })
        })
        resolve(formatedSkills);
    })

}

async function getUserinfo(res, userId) {
    User.find({
        _id: userId
    }).then(async user => {
        let selectedItems = [];

        if (user.length > 0) {
            if (user[0].skills.length > 0)
                selectedItems = await formatSelectedSkills(user[0].skills);
            res.status(200).json({
                data: user[0],
                selectedItems: selectedItems
            })
        }
    }).catch(err => utils.defaultError(res, err))

}

module.exports = {
    getUserinfo
}