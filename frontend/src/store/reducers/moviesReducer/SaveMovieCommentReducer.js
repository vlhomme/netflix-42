import {
    SAVE_MOVIE_COMMENT
} from "../../actions/ActionType";

const initialState = {
    saveMovieComments: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case SAVE_MOVIE_COMMENT:
            return {
                saveMovieComments: action.payload,
            };

        default:
            return state;
    }
}