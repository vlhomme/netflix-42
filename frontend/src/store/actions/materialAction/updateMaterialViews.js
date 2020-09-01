import axios from "axios/index";

import {
    VIEWS_MATERIAL
} from '../ActionType';

function updateViewHtttp(data, token, dispatch) {

    axios.put(process.env.REACT_APP_API_URL + "/materials/views/video", {data}, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: VIEWS_MATERIAL,
                payload: res.data.data,
            })
        })
        .catch(err => {
            dispatch({
                type: VIEWS_MATERIAL,
                payload: false,
            })
        });
}

export function updateMaterialViews(data) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await updateViewHtttp(data, token, dispatch);
    }
};