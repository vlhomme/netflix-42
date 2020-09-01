import {
    GET_FILTER_MATERIAL    
} from "../../actions/ActionType";

const initialState = {
    listFilteredCategories: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_FILTER_MATERIAL:
            return {
                listFilteredCategories: action.payload,
            };
        default:
            return state;
    }
}