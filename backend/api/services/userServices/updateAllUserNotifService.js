const Notification = require('../../models/notification');

getAlluserNotifs = (userId) => {
    return new Promise((resolve, reject) => {
        Notification.updateMany({
            userId: userId,
            notificationDeleted: false
        }, {
                notificationSeen: 1
            }).then(notifs => {
                resolve(notifs);
            })
            .catch(err => {
                console.log("getAlluserNotifs Err :", err)
                resolve(false);
            })
    })
}

async function updateAllUserNotif(userId, res) {
    let userNotifs = await getAlluserNotifs(userId);
    if (userNotifs)
        res.status(200).json(200)
    else
        res.status(500).json(500)
}

module.exports = {
    updateAllUserNotif
}