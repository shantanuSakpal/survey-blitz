import {configureStore} from "@reduxjs/toolkit";
import formObjectReducer from "../reducers/formObjectReducer";
import formResponseObjectReducer from "../reducers/formResponseObjectReducer";
import adminFormsReducer from "../reducers/adminFormsReducer";

export const store = configureStore({
    reducer: {
        formObject: formObjectReducer,
        formResponseObject: formResponseObjectReducer,
        adminFormsArray: adminFormsReducer,
    },
});
