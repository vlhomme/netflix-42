import axios from "axios/index";
import {
    GET_ALL_TCOIN,
} from '../ActionType';

function getUserWalletTcoins(token, dispatch, userId) {

    axios.get(process.env.REACT_APP_API_URL + "/users/wallet/" + userId,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_TCOIN,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_TCOIN,
                payload: false,
            })
        });
}

export function getUserWallet() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getUserWalletTcoins(token, dispatch, userId)
    }
};