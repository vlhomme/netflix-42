import {
    GET_ALL_FILTERED_MEMBERS
} from "../../actions/ActionType";

const initialState = {
    allMemebers: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_FILTERED_MEMBERS:
            return {
                allMemebers: action.payload,
            };

        default:
            return state;
    }
}