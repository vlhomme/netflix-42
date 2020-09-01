import {
    GET_MOVIE_COMMENTS
} from "../../actions/ActionType";

const initialState = {
    getMovieComments: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_MOVIE_COMMENTS:
            return {
                getMovieComments: action.payload,
            };

        default:
            return state;
    }
}