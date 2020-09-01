import {
    ADD_MATERIAL,
    UPLOAD_PROGRESS,
    NONE_ADD_MATERIAL,
    COUNT_UPLOADED_FILES
} from "../../actions/ActionType";

const initialState = {
    progressUpload: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case ADD_MATERIAL:
            return {
                success: true,
            };

        case UPLOAD_PROGRESS:
            return {
                progressUpload: action.payload,
            };

        case NONE_ADD_MATERIAL:
            return {
                success: false
            };

        case COUNT_UPLOADED_FILES:
            return {
                countUploadedFiles: action.payload,
            };

        default:
            return state;
    }
}