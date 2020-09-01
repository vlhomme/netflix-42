import axios from "axios/index";
import {
    GET_ALL_FILTERED_MEMBERS,
} from '../ActionType';

function getFilteredMemebers(catId, token, dispatch, page) {

    axios.get(process.env.REACT_APP_API_URL + "/users/all/filtered/" + catId + "/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_FILTERED_MEMBERS,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_FILTERED_MEMBERS,
                payload: false,
            })
        });
}

export function getAllFilteredMembers(page, catId) {
    const token = localStorage.getItem("token");
   
    return async function (dispatch) {
        await getFilteredMemebers(catId, token, dispatch, page)
    }
};