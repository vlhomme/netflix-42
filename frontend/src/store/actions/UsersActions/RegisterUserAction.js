import axios from "axios/index";
import {
    REGISTER_USER,
} from '../ActionType';

function signUpUser(dataHttp, dispatch) {

    axios.post(process.env.REACT_APP_API_URL + "/users/signup", dataHttp)
        .then(results => {
            dispatch({
                type: REGISTER_USER,
                payload: results.data,
            })
        })
        .catch(err => {
            dispatch({
                type: REGISTER_USER,
                payload: false,
            })
        });
}

export function signUpNewUser(data) {

    return async function (dispatch) {
        const dataHttp = new FormData()
 
        dataHttp.append('firstname', data.firstname);
        dataHttp.append('lastname', data.lastname);
        dataHttp.append('password', data.password);
        dataHttp.append('pseudonyme', data.pseudonyme);
        dataHttp.append('email', data.email);
         if (data.photo !== "")
            await dataHttp.append('photo', data.photo, data.photo.name)
    
        await signUpUser(dataHttp, dispatch);
    }

};