const utils = require('../utils')
const Notification = require('../../models/notification');

countAllmemberNotif = (userId) => {
    return new Promise((resolve, reject) => {
        Notification.find({
            userId: userId,
            notificationDeleted: false
        })
            .exec()
            .then(notifs => {
                resolve(notifs.length);
            }).catch(err => console.log("countAllmemberNotif ERR : ", err))
    })
}

countNotSeenNotif = (userId) => {
    return new Promise((resolve, reject) => {
        Notification.find({
            userId: userId,
            notificationSeen: 0,
            notificationDeleted: false
        })
            .exec()
            .then(notifs => {
                resolve(notifs.length);
            }).catch(err => console.log("countAllmemberNotif ERR : ", err))
    })
}


getAllUserNotif = (userId, page, res) => {
    Notification.find({
        userId: userId,
        notificationDeleted: false
    })
        .sort({'dateOfLastUpdate': -1})
        .skip(Number(page * 10))
        .limit(Number(10))
        .exec()
        .then(async notifs => {
            let notifCount = await countAllmemberNotif(userId);
            let noSeen = await countNotSeenNotif(userId);
            res.status(200).json({
                Count: notifCount,
                per_page: 10,
                noSeen: noSeen,
                total: notifCount,
                total_pages: Math.floor(notifCount / 10),
                data: notifs,
                code: 200,
                msg: "ok"
            })
        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    getAllUserNotif
}