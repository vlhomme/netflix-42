import {
    DELETE_MATERIAL
} from "../../actions/ActionType";

const initialState = {
    materialDeleted: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case DELETE_MATERIAL:
            return {
                materialDeleted: action.payload,
            };

        default:
            return state;
    }
}