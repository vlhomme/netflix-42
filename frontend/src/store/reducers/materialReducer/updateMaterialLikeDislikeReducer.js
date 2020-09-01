import {
    LIKE_DISLIKE_MATERIAL
} from "../../actions/ActionType";

const initialState = {
    updateLikeDislike: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case LIKE_DISLIKE_MATERIAL:
            return {
                updateLikeDislike: action.payload,
            };
        default:
            return state;
    }
}