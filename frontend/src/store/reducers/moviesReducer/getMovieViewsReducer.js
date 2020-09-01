import {
    GET_MOVIE_VIEWS
} from "../../actions/ActionType";

const initialState = {
    getMovieViews: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_MOVIE_VIEWS:
            return {
                getMovieViews: action.payload,
            };

        default:
            return state;
    }
}