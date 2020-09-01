import {
    GET_ALL_MYMATERIAL
} from "../../actions/ActionType";

const initialState = {
    allMyMaterials: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_MYMATERIAL:
            return {
                allMyMaterials: action.payload,
            };

        default:
            return state;
    }
}