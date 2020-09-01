import axios from "axios/index";
import {
    OAUTH2_USER,
} from '../ActionType';

export function oauth2User() {

    return function (dispatch) {

        axios.get(process.env.REACT_APP_API_URL + "/auth/google",
            { 'content-type': 'application/json' })
            .then(res => {
                dispatch({
                    type: OAUTH2_USER,
                })
            })
            .catch(err => {
                dispatch({
                    type: OAUTH2_USER,
                })
            });
    }
    
};