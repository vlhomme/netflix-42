import {
    STORE_MATERIAL_DETAILS
} from "../../actions/ActionType";

const initialState = {
    materialDetails: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case STORE_MATERIAL_DETAILS:
            return {
                materialDetails: action.payload,
            };
        default:
            return state;
    }
}