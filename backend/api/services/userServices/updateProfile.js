const User = require('../../models/user')
const utils = require('../utils')
const jwt = require('jsonwebtoken');
const userClass = require('../../classes/userClass');
const hashPwd = require('../../utils/hashPwd');

getSkills = (data) => {
    return new Promise((resolve, reject) => {
        let skills = [];
        let i = 0;

        while (1) {
            if (data["skillsLabel" + i] != undefined) {
                skills.push({
                    id: data["skillsId" + i],
                    label: data["skillsLabel" + i],
                    rang: data["skillsRang" + i]
                })
            } else {
                resolve(skills)
                break;
            }
            i++;
        }
    })
}


async function updateProfile(req, res) {
    User.find({
        _id: req.body.userId
    }).then(async user => {
        if (user.lenght === 0)
            console.log("updateProfile ERR");
        else {
            let skillLists = await getSkills(req.body);
            if (req.body.password !== "") {
                let newPwd = await hashPwd.hashPassword(req.body.password);
                user[0].password = newPwd;
            }
            user[0].pseudonyme =  req.body.pseudonyme;
            user[0].degree = req.body.degree;
            user[0].linkedin = req.body.linkedin;
            user[0].gitlab = req.body.gitlab;
            user[0].website = req.body.website;
            user[0].skills = skillLists;
            user[0].cv = req.files.length > 0 ? req.files[0].path : "";
            user[0].imageUrl = req.files.length > 0 ? req.files[0].path : user[0].imageUrl;
            user[0].note = req.body.note;
            user[0].email = req.body.email;
            user[0].name = req.body.firstname + " " + req.body.lastname;
            user[0].givenName = req.body.firstname;
            user[0].familyName = req.body.lastname;
            user[0].dateOfLastUpdate = Date.now();
            user[0].firstname = req.body.firstname;
            user[0].lastname = req.body.lastname;
            user[0].location = req.body.location;
            user[0].companyPosition = req.body.companyPosition;

            User.findByIdAndUpdate(user[0]._id,
                user[0], {
                    new: false,
                },
                function (err, results) {
                    if (err) return res.status(500).json(err);
                    res.status(200).json({
                        code: 200,
                        user: user
                    })
                })
        }
    }).catch(err => utils.defaultError(res, err));
}

module.exports = {
    updateProfile,
}