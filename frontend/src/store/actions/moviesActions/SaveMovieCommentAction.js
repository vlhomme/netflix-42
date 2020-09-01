import axios from "axios/index";

import {
    SAVE_MOVIE_COMMENT
} from '../ActionType';

function saveMovie(userId, dataHttp, token, dispatch) {

    axios.post(process.env.REACT_APP_API_URL + "/movies/comment/save/" + userId, dataHttp, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: SAVE_MOVIE_COMMENT,
                payload: res.data,
            })
        })
        .catch(err => {
            dispatch({
                type: SAVE_MOVIE_COMMENT,
                payload: false,
            })
        });
}

export function saveMovieComments(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {   
        await saveMovie(userId, data, token, dispatch);
    }
};