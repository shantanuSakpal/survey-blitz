import {createSlice} from "@reduxjs/toolkit";

const initialState = null;

export const formObjectSlice = createSlice({
    name: "formObject",
    initialState,
    reducers: {
        setInitialState: (state, action) => {
            state = action.payload;
            return state;
        },

        setTheme: (state, action) => {
            state.theme = action.payload;
            return state;
        },
        setIsActiveStatus: (state) => {
            state.is_active = !state.is_active;
            return state;
        },

        addSection: (state, action) => {
            state.form_sections.push(action.payload);
        },

        removeSection: (state, action) => {
            state.form_sections = state.form_sections.filter(
                (section) => section.section_id !== action.payload
            );
            state.currSectionId = state.form_sections[0].section_id;
        },

        setCurrSectionId: (state, action) => {
            state.currSectionId = action.payload;
        },

        reorderSections: (state, action) => {
            state.form_sections = action.payload;
        },
        reorderComponents: (state, action) => {
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components = action.payload.section_components;
                }
            });
        },

        addSectionComponent: (state, action) => {
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components.push(action.payload.component);
                }
            });
        },

        removeSectionComponent: (state, action) => {
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components = section.section_components.filter(
                        (component) =>
                            component.component_id !== action.payload.component_id
                    );
                }
            });
            state.currComponentId = state.form_sections.find(
                (section) => section.section_id === action.payload.section_id
            ).section_components[0].component_id;
        },

        duplicateSectionComponent: (state, action) => {
            //push after the component being duplicated
            let index = 0;
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components.forEach((component) => {
                        if (component.component_id === action.payload.component_id) {
                            index = section.section_components.indexOf(component);
                        }
                    });
                }
            });
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components.splice(
                        index + 1,
                        0,
                        action.payload.newComponent
                    );
                }
            });
        },

        updateComponentIsRequired: (state, action) => {
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components.forEach((component) => {
                        if (component.component_id === action.payload.component_id) {
                            component.is_required = !component.is_required;
                        }
                    });
                }
            });
        },

        setCurrComponent: (state, action) => {
            state.currComponentId = action.payload;
        },

        updateSectionName: (state, action) => {
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_name = action.payload.section_name;
                }
            });
        },

        setComponentPropObject: (state, action) => {
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
        },

        // New action to handle component reorder
        handleComponentReorder: (state, action) => {
            const {sourceIndex, destinationIndex} = action.payload;
            const {currSectionId} = state;

            // Find the current section
            const currentSection = state.form_sections.find(
                (section) => section.section_id === currSectionId
            );

            // Reorder the form_components in the current section
            const [reorderedComponent] = currentSection.section_components.splice(
                sourceIndex,
                1
            );
            currentSection.section_components.splice(
                destinationIndex,
                0,
                reorderedComponent
            );
        },

        editFormName: (state, action) => {
            state.form_name = action.payload;
        },
        editFormDesc: (state, action) => {
            state.form_description = action.payload;
        },
        editFormUrl: (state, action) => {
            state.form_url = action.payload;
        },

        //change input type

        changeInputType: (state, action) => {
            state.form_sections.forEach((section) => {
                if (section.section_id === action.payload.section_id) {
                    section.section_components.forEach((component) => {
                        if (component.component_id === action.payload.component_id) {
                            component.component_type = action.payload.component_type;
                        }
                    });
                }
            });
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addSection,
    removeSection,
    reorderSections,
    addSectionComponent,
    removeSectionComponent,
    setCurrSectionId,
    setCurrComponent,
    updateSectionName,
    duplicateSectionComponent,
    updateComponentIsRequired,
    setComponentPropObject,
    handleComponentReorder,
    editFormName,
    setInitialState,
    setIsActiveStatus,
    changeInputType,
    reorderComponents,
    editFormDesc,
    editFormUrl,
    setTheme,
} = formObjectSlice.actions;

export default formObjectSlice.reducer;
