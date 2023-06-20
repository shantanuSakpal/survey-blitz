import {createSlice} from "@reduxjs/toolkit";
import formObject from "../formObject";
//the initial state is the formObject which is of structure:
/*{
  "form_id": 1686909287243,
  "form_name": "Contact Info Form",
  "form_description": "This is a form for collecting contact information.",
  "form_sections": [
    {
      "section_id": 1686909287244,
      "section_name": "Personal Information ",
      "section_components": [
        {
          "component_id": 1686910681485,
          "component_type": "short_text",
          "is_required": true,
          "component_prop_object": {
            "question": "What is your name?"
          }
        },
        {
          "component_id": 1686910683308,
          "component_type": "long_text",
          "is_required": true,
          "component_prop_object": {
            "question": "age?"
          }
        },
        {
          "component_id": 1686910685309,
          "component_type": "checkboxes",
          "is_required": true,
          "component_prop_object": {
            "checkboxes": [
              "maths",
              "science",
              "phy"
            ],
            "question": "Fav subjects?"
          }
        },
        {
          "component_id": 1686910687260,
          "component_type": "multiple_choice",
          "is_required": false,
          "component_prop_object": {
            "choices": [
              "male",
              "not male"
            ],
            "question": "Gender ?"
          }
        },
        {
          "component_id": 1686910690181,
          "component_type": "dropdown",
          "is_required": true,
          "component_prop_object": {
            "options": [
              "Maharashtra",
              "Not maharastra",
              "UP",
              "MP"
            ],
            "question": "State ?"
          }
        },
        {
          "component_id": 1686910692084,
          "component_type": "date",
          "is_required": false,
          "component_prop_object": {
            "question": "todays date?"
          }
        },
        {
          "component_id": 1686910693269,
          "component_type": "time",
          "is_required": false,
          "component_prop_object": {
            "question": "tere time kab ayega?"
          }
        }
      ]
    },
    {
      "section_id": 1686910678136,
      "section_name": "contact info",
      "section_components": [
        {
          "component_id": 1686910696916,
          "component_type": "short_text",
          "is_required": true,
          "component_prop_object": {
            "question": "mobile no?"
          }
        },
        {
          "component_id": 1686910698356,
          "component_type": "checkboxes",
          "is_required": false,
          "component_prop_object": {
            "checkboxes": [
              "1",
              "2",
              "3"
            ],
            "question": "check some boxes"
          }
        },
        {
          "component_id": 1686910699869,
          "component_type": "dropdown",
          "is_required": false,
          "component_prop_object": {
            "options": [
              "adf",
              "hgh"
            ],
            "question": "select some of the below"
          }
        },
        {
          "component_id": 1686910701332,
          "component_type": "date",
          "is_required": true,
          "component_prop_object": {
            "question": "tomorrows date?"
          }
        },
        {
          "component_id": 1686910702580,
          "component_type": "time",
          "is_required": true,
          "component_prop_object": {
            "question": "oh yes"
          }
        }
      ]
    },
    {
      "section_id": 1686910929982,
      "section_name": "exit form",
      "section_components": [
        {
          "component_id": 1686910938669,
          "component_type": "short_text",
          "is_required": false,
          "component_prop_object": {
            "question": "had fun?"
          }
        },
        {
          "component_id": 1686910949469,
          "component_type": "checkboxes",
          "is_required": true,
          "component_prop_object": {
            "checkboxes": [
              "yes",
              "definitely yes",
              "ok",
              "na, i want to die here"
            ],
            "question": "want to exit?"
          }
        }
      ]
    },
    {
      "section_id": 1686911019589,
      "section_name": "Untitled Section",
      "section_components": []
    }
  ],
  "currSectionId": 1686909287244,
  "addInputState": false
}
*/


const initialState = formObject;

export const formResponseSlice = createSlice({
    name: "formResponseObject",
    initialState,
    reducers: {

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

} = formResponseSlice.actions;

export default formResponseSlice.reducer;
