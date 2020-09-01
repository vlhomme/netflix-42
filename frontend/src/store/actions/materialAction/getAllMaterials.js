import axios from "axios/index";
import {
    GET_ALL_MATERIAL,
} from '../ActionType';

function getMaterials(token, dispatch, page) {

    axios.get(process.env.REACT_APP_API_URL + "/materials/all/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_MATERIAL,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_MATERIAL,
                payload: false,
            })
        });
}

export function getAllMaterials(page) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await getMaterials(token, dispatch, page)
    }

};