const jwt = require('jsonwebtoken');

generateJwttoken = (id, email) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            id: id,
            email: email,
        }, process.env.JWT_KEY, {
                expiresIn: process.env.TOKEN_DURATION
            })

        resolve(token);
    })
}


module.exports = {
    generateJwttoken
}