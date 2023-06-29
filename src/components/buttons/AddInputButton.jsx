import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch} from "react-redux";
import {addSectionComponent, setCurrComponent} from "../../reducers/formObjectReducer";
import {useSelector} from "react-redux";

export const AddInputButton = () => {
    //on click , toggle the .hide class on AddInput
    const currSectionId = useSelector((state) => state.formObject.currSectionId);
    const dispatch = useDispatch();

    const addInput = () => {
        let date = Date.now();
        let component = {
            component_id: date,
            component_type: "short_text",
            is_required: false,
            component_prop_object: {
                "question": ""
            },
        };
        dispatch(
            addSectionComponent({
                section_id: currSectionId,
                component: component,
            })
        );
        dispatch(setCurrComponent(date))
    };
    return (
        <div
            className="add-input-button"
            onClick={() => {
                addInput()
            }}
        >
            <AddIcon fontSize="small"/>
        </div>
    );
};

