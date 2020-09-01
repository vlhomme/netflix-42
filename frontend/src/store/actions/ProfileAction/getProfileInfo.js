import axios from "axios";
import {
    INFO_PROFILE,
} from '../ActionType';

export function getProfileInfo(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        axios.get(process.env.REACT_APP_API_URL + "/users/profile/" + userId, {
            headers: {
                "Authorization": `Bearer ` + token
            }
        }).then(results => {
            dispatch({
                type: INFO_PROFILE,
                payload: results
            })
            setTimeout(() => {
                dispatch({
                    type: INFO_PROFILE,
                    payload: ""
                })
            }, 300)
        }).catch(err => {
            dispatch({
                type: INFO_PROFILE,
                payload: "error"
            })
        })
    }
};