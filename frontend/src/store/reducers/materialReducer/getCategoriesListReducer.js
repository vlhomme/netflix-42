import {
    LIST_CATEGORIES
} from "../../actions/ActionType";

const initialState = {
    listCategories: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case LIST_CATEGORIES:
            return {
                listCategories: action.payload,
            };
        default:
            return state;
    }
}