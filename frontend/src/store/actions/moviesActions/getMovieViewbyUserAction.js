import axios from "axios/index";
import {
    GET_MOVIE_VIEWS,
} from '../ActionType';

function getMovieViews(token, dispatch, userId) {

    axios.get(process.env.REACT_APP_API_URL + "/movies/views/" + userId , {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_MOVIE_VIEWS,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_MOVIE_VIEWS,
                payload: false,
            })
        });
}

export function getMovieViewsByUser() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getMovieViews(token, dispatch, userId)
    }

};