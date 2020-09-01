import {
    GET_ALL_MOVIES_BY_RATING
} from "../../actions/ActionType";

const initialState = {
    allMoviesByRatings: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_MOVIES_BY_RATING:
            return {
                allMoviesByRatings: action.payload,
            };

        default:
            return state;
    }
}