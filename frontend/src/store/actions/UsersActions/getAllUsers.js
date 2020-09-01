import axios from "axios/index";
import {
    GET_ALL_MEMBERS,
} from '../ActionType';

function getMemebers(token, dispatch, page) {

    axios.get(process.env.REACT_APP_API_URL + "/users/all/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_MEMBERS,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_MEMBERS,
                payload: false,
            })
        });
}

export function getAllMembers(page) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await getMemebers(token, dispatch, page)
    }
};