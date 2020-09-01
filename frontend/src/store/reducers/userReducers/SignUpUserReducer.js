import {
    REGISTER_USER
  } from "../../actions/ActionType";
  
  const initialState = {
    registerUser: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                registerUser: action.payload,
            };
        
        default:
            return state;
    }
}