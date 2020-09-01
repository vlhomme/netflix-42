import {
    GET_ALL_TCOIN
} from "../../actions/ActionType";

const initialState = {
    getTcoin: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_TCOIN:
            return {
                getTcoin: action.payload,
            };

        default:
            return state;
    }
}