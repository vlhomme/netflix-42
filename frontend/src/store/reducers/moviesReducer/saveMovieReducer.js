import {
    SAVE_MOVIE
} from "../../actions/ActionType";

const initialState = {
    saveMovie: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case SAVE_MOVIE:
            return {
                saveMovie: action.payload,
            };

        default:
            return state;
    }
}