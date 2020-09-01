import {
    LOGIN_FORM_USER
} from "../../actions/ActionType";

const initialState = {
    loginFormUser: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case LOGIN_FORM_USER:
            return {
                loginFormUser: action.payload,
            };

        default:
            return state;
    }
}