import {
    GET_STATS
} from "../../actions/ActionType";

const initialState = {
    userStat: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_STATS:
            return {
                userStat: action.payload,
            };

        default:
            return state;
    }
}