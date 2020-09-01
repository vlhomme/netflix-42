const bcrypt = require('bcrypt');

hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            resolve(hash);
        })
    })
}

generateRandomPassword = () => {
    return new Promise((resolve, reject) => {
        resolve(Math.random().toString(36).slice(-8));
    })
}

module.exports = {
    hashPassword,
    generateRandomPassword
}