const User = require('../../models/user')
const hashPwd = require('../../utils/hashPwd');
const emailSender = require('../../utils/emailSender');

async function userExist(emailPsudo) {
    return new Promise((resolve, rejct) => {
        User.find(
            {
                $or: [
                    { 'email': emailPsudo },
                    { 'pseudonyme': emailPsudo }
                ]
            }
        ).then(usr => {
            resolve(usr)
        }).catch(err => {
            throw new err;
        })
    })
}

async function UpateUserPwd(user, pwd) {
    return new Promise((resolve, reject) => {
        user.password = pwd;
        User.findByIdAndUpdate(user._id,
            user, {
                new: true,
            },
            function (err, results) {
                resolve(results.password)
            });
    })
}

async function resetpwd(data, res) {
    // check if emal/psudo exit
    let user = await userExist(data.email);
    if (user.length > 0) {
        // genrate password
        let newPwd = await hashPwd.generateRandomPassword();
        // hashed pwd
        let hashedPwd = await hashPwd.hashPassword(newPwd);
        // Save mew password
        await UpateUserPwd(user[0], hashedPwd)
        // send email
        let msg = `Hello ! \n  \
        \n Here is your new password : \
        ${newPwd} \
        \n Please remember to change it \
        \n HYPERTUBE TEAM`;    
        emailSender.sendEmail("HYPERTUBE TEAM", user[0].email, "Reset password", msg);
        // Check password
        res.status(200).json({
            msg: "Initialization email has been sent",
            code: 200
        })
        // return error
    } else {
        res.status(200).json({
            msg: "Email and/or account does not exist !",
            code: 204
        })
    }
}

module.exports = {
    resetpwd
}