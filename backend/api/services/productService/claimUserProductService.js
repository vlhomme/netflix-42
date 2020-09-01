const Product = require('../../models/Product');
const utils = require('../utils')
const Claim = require('../../models/claim');
let mongoose = require('mongoose');
const User = require('../../models/user');
const Wallet = require('../../models/wallet');
const Notification = require('../../models/notification');

getProductById = (id) => {
    return new Promise((resolve, reject) => {
        Product.find({
            _id: id,
            productDeleted: false,
            productStatus: 'In stock'
        }).then(prod => {
            if (prod.length > 0)
                resolve(true)
            else
                resolve(false)
        })
    })
}

getUserFullname = (userId) => {
    return new Promise((resolve, reject) => {
        User.find({
            _id: userId
        }).then(user => {
            if (user.length > 0) {
                resolve(user[0].givenName + " " + user[0].familyName)
            } else {
                resolve("");
            }
        })
    }).catch(err => console.log("getUserFullname ERR :", err))
}

updateWalletTcoin = (res, wallet, usedTCoins) => {
    return new Promise((resolve, reject) => {
        wallet[0].walletValueUsed = parseFloat(wallet[0].walletValueUsed) + parseFloat(usedTCoins);
        Wallet.findByIdAndUpdate(wallet[0]._id,
            wallet[0], {
                new: false,
                useFindAndModify: false,
            },
            function (err, results) {
                if (err) return res.status(500).json(err);
                resolve(true)
            })
    })
}


updateUsedTcoin = (res, userId, usedTCoins) => {
    return new Promise((resolve, reject) => {
        Wallet.find({
            walletDeleted: false,
            userId: userId
        }).then(async wallet => {
            if (wallet.length > 0) {
                resolve(await updateWalletTcoin(res, wallet, usedTCoins));
            } else {
                res.status(500);
            }
        }).catch(err => utils.defaultError(res, err))
    })
}

updateUserNotification = (userId, data, requestId) => {
    return new Promise((resolve, reject) => {
        let notifictaion = new Notification({
            _id: new mongoose.Types.ObjectId,
            userId: userId,
            notificationTitle: data.productTitle,
            requestId: requestId,
            notificationCategory: "goodies"
        })
        notifictaion.save()
            .then(results => {
                resolve(true);
            }).catch(err => {
                console.log("updateUserNotification ERR :", err)
                resolve(false)
            })
    })
}

async function claimUserProduct(res, data, userId) {
    let productExit = await getProductById(data._id);
    let UserName = await getUserFullname(userId);
    if (productExit) {
        let claim = new Claim({
            _id: new mongoose.Types.ObjectId,
            claimerId: userId,
            claimedId: data._id,
            claimerFullname: UserName,
            claimCategory: "Goodies",
            claimTitle: data.productTitle,
            claimDescription: data.productDescription,
            claimPhoto: data.productPhoto,
            claimPrice: data.productPrice
        })
        claim.save()
            .then(async results => {
                if (await updateUsedTcoin(res, userId, data.productPrice) &&
                    await updateUserNotification(userId, data, results._id)) {
                    res.status(200).json(200)
                }
                else
                    res.status(500).json(500)
            }).catch(err => utils.defaultError(res, err))
    } else {
        res.status(500);
    }
}

module.exports = {
    claimUserProduct
}