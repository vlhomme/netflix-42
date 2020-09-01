import axios from "axios/index";
import {
    GET_USER_NOTIF,
} from '../ActionType';

function getNotifications(userId, token, dispatch, page) {

    axios.get(process.env.REACT_APP_API_URL + "/users/notifications/" + userId + "/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_USER_NOTIF,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_USER_NOTIF,
                payload: [],
            })
        });
}

export function getUserNotification(page) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getNotifications(userId, token, dispatch, page)
    }
};