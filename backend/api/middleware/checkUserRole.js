const User = require('../models/user');

findUserAndCheck = (userId) => {
    return new Promise((resolve, reject) => {
        User.find({
            _id: userId
        }).then(user => {
            if (user.length === 0)
                resolve(false);
            else {
                if (user[0].role === "HR")
                    resolve(true)
                else
                    resolve(false)
            }
        }).catch(err => {
            console.log("findUserAndCheck ERR :", err)
            resolve(false)
        })
    })
}

async function checkUserRole(req, res, next) {
    try {
        let userId = req.params.userId
        if (await findUserAndCheck(userId))
            next();
        else {
            res.status(401).json({
                message: "User not authorized"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: "User not authorized"
        })
    }
}

module.exports = {
    checkUserRole,
}
