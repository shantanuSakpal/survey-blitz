import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useDispatch} from "react-redux";
import {addSection, setCurrComponent, setCurrSectionId} from "../../reducers/formObjectReducer";

export const AddSectionButton = () => {
    //add a section component to the formComponentsObj with key as current Date.now() and value as section
    const dispatch = useDispatch();

    return (
        <div
            className="add-section-button"
            onClick={() => {
                let date = Date.now();
                dispatch(
                    addSection({
                        section_id: date,
                        section_name: "Untitled Section",
                        section_components: [
                            {
                                component_id: date - 1,
                                component_type: "short_text",
                                is_required: false,
                                component_prop_object: {
                                    question: ""
                                }
                            }
                        ],
                    })
                );
                dispatch(setCurrSectionId(date));
                dispatch(setCurrComponent(date - 1))
            }}
        >
            <AddBoxIcon fontSize="small"/>
            <p>Add Section</p>
        </div>
    );
};
