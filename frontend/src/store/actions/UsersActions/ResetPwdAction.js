import axios from "axios/index";
import {
    RESET_USER,
} from '../ActionType';

function resetUserPwd(dataHttp, dispatch) {

    axios.post(process.env.REACT_APP_API_URL + "/users/resetpwd", dataHttp)
        .then(results => {
            dispatch({
                type: RESET_USER,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: RESET_USER,
                payload: false,
            })
        });
}

export function resetUserPassword(data) {

    return async function (dispatch) {
    
        await resetUserPwd(data, dispatch);
    }

};