const User = require('../../models/user')
const utils = require('../utils')
const Material = require('../../models/material');
const Category = require('../../models/category');
const Wallet = require("../../models/wallet");
const mongoose = require('mongoose');

uploadUserCoins = (res, userId) => {
    return new Promise((resolve, reject) => {
        Material.find({
            "uploadedBy.userId": userId,
        }).exec()
            .then(Materials => resolve(Materials.length))
            .catch(err => utils.defaultError(res, err))
    })
}

async function countUserTCoins(res, userId, wallet) {
    return new Promise(async (resolve, reject) => {
        let uploadCoins = await uploadUserCoins(res, userId);
        let totalTcoin = (wallet.views + wallet.dislikes + wallet.likes) / 10;
        resolve(totalTcoin + uploadCoins - wallet.walletValueUsed);
    })
}

createWallet = (userId, countTCoins) => {
    return new Promise((resolve, reject) => {
        let wallet = new Wallet({
            _id: new mongoose.Types.ObjectId,
            userId: userId,
            walletValue: countTCoins
        })
        wallet.save()
            .then(wallet => {
               resolve(true);
            })
            .catch(err => console.log("createWallet ERR :", err))
    })
}

updateWallet = (res, wallet, countTCoins) => {
    return new Promise((resolve, reject) => {
        wallet[0].walletValue = countTCoins.toFixed(2);
        Wallet.findByIdAndUpdate(wallet[0]._id,
            wallet[0], {
                new: false,
            },
            function (err, results) {
                if (err) return res.status(500).json(err);
                res.status(200).json({
                    data: wallet[0].walletValue
                })
            })
    })
}

getUserWallet = (userId, res) => {
    Wallet.find({
        walletDeleted: false,
        userId: userId
    }).then(async wallet => {
        if (wallet.length === 0){
            await createWallet(userId, 0);
            res.status(200).json({
                data: wallet[0].walletValue
            })
        } else {
            let countTCoins = await countUserTCoins(res, userId, wallet[0]);
            await updateWallet(res, wallet, countTCoins);
        }
    }).catch(err => utils.defaultError(res, err))
}

module.exports = {
    getUserWallet
}