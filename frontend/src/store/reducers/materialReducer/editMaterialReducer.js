import {
    UPLOAD_PROGRESS,
    EDIT_MATERIAL,
    COUNT_UPLOADED_FILES
} from "../../actions/ActionType";

const initialState = {
    success: "",
};

export default function (state = initialState, action) {
    switch (action.type) {

        case EDIT_MATERIAL:
            return {
                success: action.payload,
            };

        case UPLOAD_PROGRESS:
            return {
                progressUpload: action.payload,
            };

        case COUNT_UPLOADED_FILES:
            return {
                countUploadedFiles: action.payload,
            };

        default:
            return state;
    }
}