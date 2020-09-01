import axios from "axios/index";
import {
    LOGIN_FORM_USER,
} from '../ActionType';
const createHistory = require("history").createBrowserHistory;

function loginFormUser(dataHttp, dispatch) {

    axios.post(process.env.REACT_APP_API_URL + "/users/loginform", dataHttp)
        .then(results => {
            console.log("results:", results)
            if (results.data.code === 204)
                dispatch({
                    type: LOGIN_FORM_USER,
                    payload: results.data,
                })
            else if (results.data.code === 200) {
                let history = createHistory();

                localStorage.setItem('token', results.data.token);
                localStorage.setItem('userId', results.data.userId);
                localStorage.setItem('familyName', results.data.familyName);
                localStorage.setItem('givenName', results.data.givenName);
                localStorage.setItem('imageUrl', results.data.imageUrl);
                localStorage.setItem('dateOfCreation', results.data.dateOfCreation);
             
                history.push("/");
                let loc = window.location.href;
                window.location.href = loc;
            }
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FORM_USER,
                payload: false,
            })
        });
}

export function loginFormThisUser(data) {

    return async function (dispatch) {

        await loginFormUser(data, dispatch);
    }

};