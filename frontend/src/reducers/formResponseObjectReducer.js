import {createSlice} from "@reduxjs/toolkit";


const initialState = null;

export const formResponseSlice = createSlice({
    name: "formResponseObject",
    initialState,
    reducers: {

        //to store form response object in redux store

        setInitialState: (state, action) => {

            state = action.payload;
            return state;

        }
        ,


        updateResponse: (state, action) => {
            //find the component object
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components.forEach((component) => {
                        if (component.component_id === action.payload.component_id) {
                            component.component_prop_object =
                                action.payload.component_prop_object;
                        }
                    });
                }
            });


        }

    },
});

// Action creators are generated for each case reducer function
export const {
    updateResponse,
    setInitialState

} = formResponseSlice.actions;

export default formResponseSlice.reducer;
