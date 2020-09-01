import axios from "axios/index";
import {
    AUTH_USER,
    UNAUTH_USER
} from '../ActionType';


const createHistory = require("history").createBrowserHistory;

export function authUser(response) {

    return function (dispatch) {
        let history = createHistory();
        if (response && response.profileObj != null) {
            axios.post(process.env.REACT_APP_API_URL + "/users/login",
                response, { 'content-type': 'application/x-www-form-urlencoded' })
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        localStorage.setItem('familyName', res.data.familyName);
                        localStorage.setItem('givenName', res.data.givenName);
                        localStorage.setItem('imageUrl', res.data.imageUrl);
                        localStorage.setItem('dateOfCreation', res.data.dateOfCreation);
                        dispatch({
                            type: AUTH_USER,
                        })
                        history.push("/#/");
                        let pathUrl = window.location.href;
                        window.location.href = pathUrl;
                    } else {
                        dispatch({
                            type: UNAUTH_USER,
                        })
                    }
                })
                .catch(err => {
                    dispatch({
                        type: UNAUTH_USER,
                    })
                });
        }
    }

};