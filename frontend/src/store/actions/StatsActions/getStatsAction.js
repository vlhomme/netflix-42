import axios from "axios/index";
import {
    GET_STATS,
} from '../ActionType';

function getMyStats(token, userId, dispatch) {

    axios.get(process.env.REACT_APP_API_URL + "/users/stats/" + userId,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_STATS,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STATS,
                payload: false,
            })
        });
}

export function getUserStats() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getMyStats(token, userId, dispatch)
    }

};