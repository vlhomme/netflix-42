import axios from "axios/index";

import {
    LIST_CATEGORIES
} from '../ActionType';

function getCategoriesHtttp(token, dispatch) {

    axios.get(process.env.REACT_APP_API_URL + "/category/list", {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: LIST_CATEGORIES,
                payload: res.data.data,
            })
        })
        .catch(err => {
            dispatch({
                type: LIST_CATEGORIES,
                payload: false,
            })
        });
}

export function getCategoriesList() {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await getCategoriesHtttp(token, dispatch);
    }
};