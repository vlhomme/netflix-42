import {
    AUTH_USER,
    UNAUTH_USER
  } from "../../actions/ActionType";
  
  const initialState = {
    authenticated: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        
        case AUTH_USER:
            return {
                authenticated: true,
            };
        
        case UNAUTH_USER:
            return {
                authenticated: false
            };    
        
        default:
            return state;
    }
}