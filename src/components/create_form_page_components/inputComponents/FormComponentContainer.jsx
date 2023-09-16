import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCurrComponent} from "../../../reducers/formObjectReducer";
import {ShortTextInput} from "./ShortTextInput";
import {LongTextInput} from "./LongTextInput";
import {InputOptions} from "./InputOptions";
import {TimeInput} from "./TimeInput";
import {DateInput} from "./DateInput";
import {CheckboxInput} from "./CheckboxInput";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {DropDown} from "./DropDown";
import {MultipleChoice} from "./MultipleChoice";

export const FormComponentContainer = ({component_id, component_type}) => {
    const currSectionId = useSelector((state) => state.formObject.currSectionId);
    const currComponentId = useSelector((state) => state.formObject.currComponentId);
    const dispatch = useDispatch();

    return (
        <div
            className={`form-component-container ${currComponentId === component_id ? 'highlight' : ''}`}
            onClick={() => {
                dispatch(setCurrComponent(component_id));
            }}
        >

            {/* Render the component based on the component_type */}
            {component_type === "short_text" ? (
                <ShortTextInput
                    key={component_id}
                    component_id={component_id}
                    currSectionId={currSectionId}
                />
            ) : component_type === "long_text" ? (
                <LongTextInput
                    key={component_id}
                    component_id={component_id}
                    currSectionId={currSectionId}
                />
            ) : component_type === "time" ? (
                <TimeInput
                    key={component_id}
                    component_id={component_id}
                    currSectionId={currSectionId}
                />
            ) : component_type === "date" ? (
                <DateInput
                    key={component_id}
                    component_id={component_id}
                    currSectionId={currSectionId}
                />
            ) : component_type === "checkboxes" ? (
                <CheckboxInput
                    key={component_id}
                    component_id={component_id}
                    currSectionId={currSectionId}
                />
            ) : component_type === "dropdown" ? (
                <DropDown
                    key={component_id}
                    component_id={component_id}
                    currSectionId={currSectionId}
                />
            ) : component_type === "multiple_choice" ? (
                <MultipleChoice
                    key={component_id}
                    component_id={component_id}
                    currSectionId={currSectionId}
                />
            ) : (
                <div>Component not found</div>
            )}
            <InputOptions
                component_id={component_id}
                currSectionId={currSectionId}
                component_type={component_type}
            />
        </div>
    );
};
