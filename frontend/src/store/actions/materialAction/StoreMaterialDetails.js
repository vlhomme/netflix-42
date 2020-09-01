
import {
    STORE_MATERIAL_DETAILS
} from '../ActionType';


export function storeMaterialDetails(data) {

    return async function (dispatch) {
        dispatch({
            type: STORE_MATERIAL_DETAILS,
            payload: data,
        })
    }
};