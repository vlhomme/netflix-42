import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import authReducer from './reducers/userReducers/auth_reducer';
import addMaterialReducer from './reducers/materialReducer/addMaterialReducer';
import getCategoriesListReducer from './reducers/materialReducer/getCategoriesListReducer';
import getAllMaterials from './reducers/materialReducer/getAllMaterialsReducer';
import profileUpdated from './reducers/profileReducer/profileReducer'
import profileInfo from './reducers/profileReducer/getProfileInfoReducer'
import getAllMembers from './reducers/userReducers/getAllmembersReducer';
import getAllMyMaterials from './reducers/materialReducer/getAllMyMaterialsreducer';
import deleteMaterial from "./reducers/materialReducer/deleteMaterialReducer";
import editMaterial from "./reducers/materialReducer/editMaterialReducer";
import updateViews from "./reducers/materialReducer/updateMaterialViewReducer";
import updateMaterialLikeDislike from './reducers/materialReducer/updateMaterialLikeDislikeReducer';
import filteredMaterials from './reducers/materialReducer/getFilteredMaterialByCatReducer';
import getUserStats from './reducers/StatsReducer/StatsReducer';
import getAllfilteredMembers from './reducers/userReducers/getAllFilteredUserreducer';
import getTcoin from './reducers/userReducers/getUserWalletReducer';
import allUserNotifs from './reducers/userReducers/getUserNotificationReducer';
import updateNotif from './reducers/userReducers/updateUserNotifReducer';
import authenticatedOauth2 from './reducers/userReducers/oauth2UserReducer';
import materialDetails from './reducers/materialReducer/StoreMaterialDetailsReducer';
import registerUser from './reducers/userReducers/SignUpUserReducer';
import loginFormUser from './reducers/userReducers/LoginFormUserreducer';
import resetPwd from './reducers/userReducers/ResetPwdReducer';
import allMoviesByRatings from './reducers/moviesReducer/getAllMoviesByRatingReducer';
import saveMovie from './reducers/moviesReducer/saveMovieReducer';
import saveMovieComments from './reducers/moviesReducer/SaveMovieCommentReducer';
import getMovieComments from './reducers/moviesReducer/getMovieCommentsreducer';
import getMovieViews from './reducers/moviesReducer/getMovieViewsReducer';

const reducers = combineReducers({
  getMovieViews: getMovieViews,
  getMovieComments: getMovieComments,
  saveMovie: saveMovie,
  saveMovieComments: saveMovieComments,
  allMoviesByRatings: allMoviesByRatings,
  resetPwd: resetPwd,
  loginFormUser: loginFormUser,
  registerUser: registerUser,
  materialDetails: materialDetails,
  router: routerReducer,
  authenticatedOauth2: authenticatedOauth2,
  updateNotif: updateNotif,
  allUserNotifs: allUserNotifs,
  getTcoin: getTcoin,
  auth: authReducer,
  getAllfilteredMembers: getAllfilteredMembers,
  getUserStats: getUserStats,
  filteredMaterials: filteredMaterials,
  updateMaterialLikeDislike: updateMaterialLikeDislike,
  updateViews: updateViews,
  editMaterial: editMaterial,
  addMaterial: addMaterialReducer,
  getCategoriesList: getCategoriesListReducer,
  allMaterials: getAllMaterials,
  profileUpdated: profileUpdated,
  profileInfo: profileInfo,
  getAllMembers: getAllMembers,
  getAllMyMaterials: getAllMyMaterials,
  deleteMaterial: deleteMaterial
});

export default reducers;