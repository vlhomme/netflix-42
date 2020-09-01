import axios from "axios/index";

import {
    SAVE_MOVIE
} from '../ActionType';

function saveMovie(userId, dataHttp, token, dispatch) {
    axios.post(process.env.REACT_APP_API_URL + "/movies/save/" + userId, dataHttp, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: SAVE_MOVIE,
                payload: res.data,
            })

            setTimeout(() => {
                dispatch({
                    type: SAVE_MOVIE,
                    payload: "",
                })
            }, 300);

        })
        .catch(err => {
            dispatch({
                type: SAVE_MOVIE,
                payload: "",
            })
        });
}

export function saveMovieDetails(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {   
        await saveMovie(userId, data, token, dispatch);
    }
};