import {
    GET_ALL_MATERIAL
} from "../../actions/ActionType";

const initialState = {
    allMaterials: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_MATERIAL:
            return {
                allMaterials: action.payload,
            };

        default:
            return state;
    }
}