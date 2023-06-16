import {configureStore} from "@reduxjs/toolkit";
import formObjectReducer from "../reducers/formObjectReducer";
import formResponseObjectReducer from "../reducers/formResponseObjectReducer";

export const store = configureStore({
    reducer: {
        formObject: formObjectReducer,
        formResponseObject: formResponseObjectReducer,
    },
});
