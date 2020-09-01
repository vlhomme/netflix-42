import {
    GET_USER_NOTIF
} from "../../actions/ActionType";

const initialState = {
    allUserNotifs: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_USER_NOTIF:
            return {
                allUserNotifs: action.payload,
            };

        default:
            return state;
    }
}