import {
    OAUTH2_USER,
} from "../../actions/ActionType";

const initialState = {
    authenticatedOauth2: "",
};

export default function (state = initialState, action) {
    switch (action.type) {

        case OAUTH2_USER:
            return {
                authenticatedOauth2: true,
            };

        default:
            return state;
    }
}