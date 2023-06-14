import { createSlice } from "@reduxjs/toolkit";

let date = Date.now();

const initialState = {
  form_id: date - 1,
  form_name: "Contact Info Form",
  form_description: "This is a form for collecting contact information.",
  form_sections: [
    {
      section_id: date,
      section_name: "Untitled Section",
      section_components: [],
    },
  ],
  currSectionId: date,
  addInputState: false,
};

export const formObjectSlice = createSlice({
  name: "formObjectsArray",
  initialState,
  reducers: {
    addSection: (state, action) => {
      state.form_sections.push(action.payload);
    },

    removeSection: (state, action) => {
      state.form_sections = state.form_sections.filter(
        (section) => section.section_id !== action.payload
      );

      // If the section being removed is the current section, set the current section to the first section
      if (state.currSectionId === action.payload) {
        state.currSectionId = state.form_sections[0].section_id;
      }
    },

    setCurrSectionId: (state, action) => {
      state.currSectionId = action.payload;
    },

    reorderSections: (state, action) => {
      state.form_sections = action.payload;
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
    },

    duplicateSectionComponent: (state, action) => {
      state.form_sections.forEach((section) => {
        if (section.section_id === action.payload.section_id) {
          section.section_components.push(action.payload.newComponent);
        }
      });
    },

    updateComponentIsRequired: (state, action) => {
      state.form_sections.forEach((section) => {
        if (section.section_id === action.payload.section_id) {
          section.section_components.forEach((component) => {
            if (component.component_id == action.payload.component_id) {
              component.is_required = !component.is_required;
            }
          });
        }
      });
    },

    changeAddInputState: (state, action) => {
      state.addInputState = action.payload;
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
  changeAddInputState,
  updateSectionName,
  duplicateSectionComponent,
  updateComponentIsRequired,
  setComponentPropObject,
} = formObjectSlice.actions;

export default formObjectSlice.reducer;
