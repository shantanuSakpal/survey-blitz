import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
    CheckCircleOutline,
    RadioButtonChecked,
    ShortText,
    Subject,
    ArrowDropDownCircle,
    Event,
    AccessTime,
    UploadFile,
} from "@mui/icons-material";
import {changeInputType} from "../../../reducers/formObjectReducer";

export default function AddInput() {
    const currSectionId = useSelector((state) => state.formObject.currSectionId);
    const currComponentId = useSelector((state) => state.formObject.currComponentId);
    const dispatch = useDispatch();
    const formObject = useSelector((state) => state.formObject);
    //get the component type of the current component
    let currComponent = formObject.form_sections
        .find((section) => section.section_id === currSectionId)
        .section_components.find((component) => component.component_id === currComponentId);

    if (currComponent === undefined) {
        currComponent = formObject.form_sections
            .find((section) => section.section_id === currSectionId)
            .section_components[0];
    }
    let currComponentType = currComponent.component_type;
    const handleOptionChange = (event) => {

        dispatch(changeInputType({
            section_id: currSectionId,
            component_id: currComponentId,
            component_type: event.target.value
        }));
    };


    const inputOptions = [
        {id: "short_text", label: "Short text", icon: <ShortText fontSize="smaller"/>},
        {id: "long_text", label: "Long text", icon: <Subject fontSize="smaller"/>},
        {id: "checkboxes", label: "Checkboxes", icon: <CheckCircleOutline fontSize="smaller"/>},
        {id: "multiple_choice", label: "Multiple choice", icon: <RadioButtonChecked fontSize="smaller"/>},
        {id: "dropdown", label: "Dropdown", icon: <ArrowDropDownCircle fontSize="smaller"/>},
        {id: "date", label: "Date", icon: <Event fontSize="smaller"/>},
        {id: "time", label: "Time", icon: <AccessTime fontSize="smaller"/>},
        {id: "upload_file", label: "Upload file", icon: <UploadFile fontSize="smaller"/>},
    ];
    const selectClasses = {
        // Add your custom classes here
        root: "custom-root-class",
        select: "custom-select-class",
    };


    return (
        <div id="addInput" className="inputs-container">
            <div className="header-and-close-input-container">
                <h3>Change the input type</h3>
            </div>
            <FormControl>
                <Select
                    classes={selectClasses}

                    value={currComponentType}
                    onChange={handleOptionChange}
                    displayEmpty
                    inputProps={{"aria-label": "Select input type"}}
                >
                    <MenuItem value="" disabled>
                        Select an option
                    </MenuItem>
                    {inputOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.icon}
                            <div style={{marginLeft: "10px", fontSize: "0.8rem"}}>
                                {option.label}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
