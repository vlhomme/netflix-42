const userService = require("../services/userServices/userLoginServices")
const updateProfileService = require('../services/userServices/updateProfile');
const getUserInfoService = require('../services/userServices/getUserInfoService');
const getAllUsersService = require('../services/userServices/getAllUsersService');
const getUserStatsService = require('../services/userServices/getUserStatsService');
const getAllfilteredIsers = require('../services/userServices/getAllfilteredIsersService');
const getUserWalletService = require('../services/userServices/getUserWalletService');
const getAllUserNotifService = require('../services/userServices/getAllUserNotifService');
const updateAllUserNotifService = require('../services/userServices/updateAllUserNotifService');
const creatNewUserService = require('../services/userServices/creatNewUserService');
const loginformUserService = require('../services/userServices/loginformUserService');
const resetpwdUserService = require('../services/userServices/resetpwdUserService');

loginUser = (req, res, next) => {
    userService.loginUser(res, req.body.profileObj);
}

userProfile = (req, res, next) => {
    updateProfileService.updateProfile(req, res)
}

getUserProfileInfo = (req, res, next) => {
    let userId = req.params.userId;
    getUserInfoService.getUserinfo(res, userId);
}

getAllusers = (req, res, next) => {
    let page = req.params.page;
    getAllUsersService.listAlluser(res, page);
}

getUserStats = (req, res, next) => {
    let userId = req.params.userId;

    getUserStatsService.getUserStats(userId, res);
}

getAllFilteredUsers = (req, res, next) => {
    let catId = req.params.catId;
    let page = req.params.page;
    getAllfilteredIsers.getFilteredMembers(res, catId, page);
}

getMyWalletTcoin = (req, res, next) => {
    let userId = req.params.userId;
    getUserWalletService.getUserWallet(userId, res);
}

getUserNotifications = (req, res, next) => {
    let userId = req.params.userId;
    let page = req.params.page;

    getAllUserNotifService.getAllUserNotif(userId, page, res);
}

updateUserNotifications = (req, res, next) => {
    let userId = req.params.userId;

    updateAllUserNotifService.updateAllUserNotif(userId, res);
}

registerNewUserControl = (req, res, next) => {
    creatNewUserService.creatNewUser(req.body, req.files, res);
}

loginformUserControl = (req, res, next) => {
    loginformUserService.loginformUser(req.body, res);
}

resetpwdControl = (req, res, next) => {
    resetpwdUserService.resetpwd(req.body, res);
}

module.exports = {
    resetpwdControl,
    loginformUserControl,
    registerNewUserControl,
    updateUserNotifications,
    getAllFilteredUsers,
    getMyWalletTcoin,
    getUserNotifications,
    getUserStats,
    loginUser,
    getAllusers,
    userProfile,
    getUserProfileInfo
}
