import {
    UPDATE_USER_NOTIF
} from "../../actions/ActionType";

const initialState = {
    updateNotif: false,
};


export default function (state = initialState, action) {
    switch (action.type) {

        case UPDATE_USER_NOTIF:
            return {
                updateNotif: action.payload,
            };

        default:
            return state;
    }
}