import { configureStore } from "@reduxjs/toolkit";
import formObjectReducer from "../reducers/formObjectReducer";
export const store = configureStore({
  reducer: {
    formObject: formObjectReducer,
  },
});
