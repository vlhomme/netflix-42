import {
    INFO_PROFILE
  } from "../../actions/ActionType";
  
  const initialState = {
    profileInfo: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        
        case INFO_PROFILE:
            return {
                profileInfo: action.payload,
            };
        
        default:
            return state;
    }
}