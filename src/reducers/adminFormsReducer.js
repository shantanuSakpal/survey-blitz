import {createSlice} from "@reduxjs/toolkit";

const initialState = null;

export const adminFormsSlice = createSlice({
    name: "adminFormsArray",
    initialState,
    reducers: {

        //to store form response object in redux store

        setInitialState: (state, action) => {

            state = action.payload;
            return state;

        }
        ,


        deleteForm: (state, action) => {

            //delete the form from the array
            const form_id = action.payload;

            const index = state.findIndex((form) => form.form_id === form_id);
            if (index !== -1) {
                state.splice(index, 1);
            }
            

        },


    },
});

// Action creators are generated for each case reducer function
export const {
    updateResponse,
    setInitialState,
    deleteForm,

} = adminFormsSlice.actions;

export default adminFormsSlice.reducer;
