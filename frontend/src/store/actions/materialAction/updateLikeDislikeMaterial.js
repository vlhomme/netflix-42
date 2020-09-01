import axios from "axios/index";

import {
    LIKE_DISLIKE_MATERIAL
} from '../ActionType';

function updateLikeDislikeHtttp(data, token, dispatch) {

    axios.put(process.env.REACT_APP_API_URL + "/materials/likedislike/video", {data}, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: LIKE_DISLIKE_MATERIAL,
                payload: res.data.data,
            })
        })
        .catch(err => {
            dispatch({
                type: LIKE_DISLIKE_MATERIAL,
                payload: false,
            })
        });
}

export function updateMaterialLikeDislike(data) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await updateLikeDislikeHtttp(data, token, dispatch);
    }
};