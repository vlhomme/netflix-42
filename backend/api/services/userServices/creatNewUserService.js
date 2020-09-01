const userClass = require("../../classes/userClass");
const User = require('../../models/user');

function userExist(email, pseudonyme) {
    return new Promise((resolve, reject) => {
        User.find({
            $or: [
                { 'email': email },
                { 'pseudonyme': pseudonyme }
            ]
        }).then(usr => {
            usr.length === 0 ?
                resolve(false) : resolve(true);
        })
    })
}

async function creatNewUser(data, files, res) {
    try {
        // Check if user exist
        if (await userExist(data.email, data.pseudonyme)) {
            res.status(200).json({
                code: 204,
                msg: "This email and/or psudonyme exist !"
            })
        } else {
            // Created a new account
            let user = new User(await userClass.creatNewRegisterUser(data, files[0].path))
            user.save()
                .then(results => {
                    res.status(200).json({
                        code: 200,
                        msg: "Account created with success"
                    })
                }).catch(err => {
                    res.status(200).json({
                        msg: "An error occured, this incident will be repproted",
                        code: 500
                    })
                })
        }
    } catch (err) {
        res.status(200).json({
            msg: "An error occured, this incident will be repproted",
            code: 500
        })
    }
}

module.exports = {
    creatNewUser
}