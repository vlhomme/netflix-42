import axios from "axios/index";
import { browserHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import {
    LOGOUT_USER
} from '../ActionType';



export function logoutUser(response) {

    return function (dispatch) {
        dispatch({
            type: LOGOUT_USER,
        })
    }

};