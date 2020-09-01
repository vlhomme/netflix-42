import {
    VIEWS_MATERIAL
} from "../../actions/ActionType";

const initialState = {
    updateView: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case VIEWS_MATERIAL:
            return {
                updateView: action.payload,
            };
        default:
            return state;
    }
}