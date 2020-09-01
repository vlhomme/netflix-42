import axios from "axios/index";
import {
    GET_ALL_MOVIES_BY_RATING,
} from '../ActionType';

async function getMovies(dispatch, query, page, filter) {
    if (filter === undefined) {
        axios.get("https://yts.lt/api/v2/list_movies.json?page=" + page + query,
        )
            .then(results => {
                dispatch({
                    type: GET_ALL_MOVIES_BY_RATING,
                    payload: results.data,
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ALL_MOVIES_BY_RATING,
                    payload: false,
                })
            });
    } else {
        let results = await getMoviesBydate(page, query);

        let new_result = [];
        const min = filter[0];
        const max = filter[1];
        await setTimeout(async () => {
            if (results.data.data !== undefined && results.data.data !== null) {
                results.data.data.movies.forEach(element => {
                    if (parseInt(element.year) > parseInt(min) && parseInt(element.year) < parseInt(max)) {
                        new_result.push(element);
                    }
                });
            }
            let i = parseInt(results.data.data.page_number) + 1;
            while (new_result.length < 20) {
                results = await getMoviesBydate(i, query);
                if (results.data.data.movies && results.data && results.data.data !== undefined && results.data.data !== null) {
                    results.data.data.movies.forEach(element => {
                        if (parseInt(element.year) > parseInt(min) && parseInt(element.year) < parseInt(max)) {
                            new_result.push(element);
                        }
                    });
                }
                i++;
            }

            results.data.data.movies = [];
            results.data.data.movies = new_result;

            dispatch({
                type: GET_ALL_MOVIES_BY_RATING,
                payload: results.data,
            })
        }, 150);
    }
}

async function getMoviesBydate(page, query) {
    return new Promise((resolve, reject) => {
        axios.get("https://yts.lt/api/v2/list_movies.json?page=" + page + query)
            .then(async (results) => {
                resolve(results);
            })
    })
}

export function getMoviesByRatings(query, page, filter) {
    return async function (dispatch) {
        await getMovies(dispatch, query, page, filter);
    }

};