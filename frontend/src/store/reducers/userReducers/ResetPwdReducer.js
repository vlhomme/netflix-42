import {
    RESET_USER
} from "../../actions/ActionType";

const initialState = {
    resetPwd: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case RESET_USER:
            return {
                resetPwd: action.payload,
            };

        default:
            return state;
    }
}