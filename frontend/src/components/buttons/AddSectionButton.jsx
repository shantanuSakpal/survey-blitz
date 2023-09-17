import React from "react";
import {useDispatch} from "react-redux";
import {addSection, setCurrComponent, setCurrSectionId} from "../../reducers/formObjectReducer";
import AddIcon from "@mui/icons-material/Add";

export const AddSectionButton = () => {
    //add a section component to the formComponentsObj with key as current Date.now() and value as section
    const dispatch = useDispatch();
    const addPage = () => {
        let date = Date.now();
        dispatch(
            addSection({
                section_id: date,
                section_name: "Untitled Page",
                section_components: [
                    {
                        component_id: date - 1,
                        component_type: "short_text",
                        is_required: true,
                        component_prop_object: {
                            question: ""
                        }
                    }
                ],
            })
        );
        dispatch(setCurrSectionId(date));
        dispatch(setCurrComponent(date - 1))
    }

    return (
        <div
            className="add-input-button"
            onClick={() => {
                addPage();
            }}
        >
            <AddIcon fontSize="small"/>
        </div>
    );
};
