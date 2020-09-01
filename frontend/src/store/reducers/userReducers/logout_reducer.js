import {
    LOGOUT_USER
  } from "../../actions/ActionType";
  
  const initialState = {
    logout: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        
        case LOGOUT_USER:
            return {
                logout: true,
            };
        
        default:
            return state;
    }
}