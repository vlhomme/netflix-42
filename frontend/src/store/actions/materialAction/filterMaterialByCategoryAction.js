import axios from "axios/index";
import {
    GET_FILTER_MATERIAL,
} from '../ActionType';

function getMaterials(token, dispatch, page, catId) {

    axios.get(process.env.REACT_APP_API_URL + "/materials/filteredbycategory/"+ catId + "/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_FILTER_MATERIAL,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_FILTER_MATERIAL,
                payload: false,
            })
        });
}

export function getFilteredMaterials(page, catId) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await getMaterials(token, dispatch, page, catId)
    }

};