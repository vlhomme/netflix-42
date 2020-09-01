const utils = require('../utils')
const Claim = require('../../models/claim');
const Notification = require('../../models/notification');

async function editClaims(data, res) {
    Claim.find({
        _id: data.id
    }).then(claim => {
        let dateNow = Date.now();
        if (claim.length > 0) {
            claim[0].claimState = data.claimStatus;
            Claim.findByIdAndUpdate(claim[0]._id,
                claim[0], {
                    new: false,
                },
                function (err, results) {
                    if (err) return res.status(500).json(err);
                    Notification.update({
                        requestId: data.id,
                        notificationDeleted: false
                    }, {
                            notificationSeen: 0,
                            notificationStatus: data.claimStatus,
                            dateOfLastUpdate: dateNow,
                        }).then(notifs => {
                            res.status(200).json(200)
                        })
                        .catch(err => {
                            console.log("editClaims Err :", err)
                            res.status(500).json(500)
                        })
                })
        } else {
            res.status(404)
        }
    }).catch(err => utils.defaultError(res, err))
}

module.exports = {
    editClaims
}