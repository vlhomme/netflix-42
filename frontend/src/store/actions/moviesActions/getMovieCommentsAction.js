import axios from "axios/index";
import {
    GET_MOVIE_COMMENTS,
} from '../ActionType';

function getComment(token, dispatch, movieId) {

    axios.get(process.env.REACT_APP_API_URL + "/movies/comments/" + movieId , {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_MOVIE_COMMENTS,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_MOVIE_COMMENTS,
                payload: false,
            })
        });
}

export function getMovieComments(movieId) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await getComment(token, dispatch, movieId)
    }

};