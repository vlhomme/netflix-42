const bcrypt = require('bcrypt');

async function passwordMatchVerification (postedPassword, userPassword) {
    return new Promise((resolve, reject) => {
        resolve(bcrypt.compareSync(postedPassword, userPassword));  
    })
}

module.exports = {
    passwordMatchVerification
}