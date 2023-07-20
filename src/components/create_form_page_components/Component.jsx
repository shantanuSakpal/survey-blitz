//this component holds the item that the user has selected to add to the form , so this is like the body of the item, just pass the type

import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {DeleteButton} from "../buttons/DeleteButton";
import {removeSectionComponent, setCurrComponent} from "../../reducers/formObjectReducer";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {useDispatch, useSelector} from "react-redux";

export const Component = ({
                              component_type,
                              component_id,

                          }) => {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );
    const currComponentId = useSelector((state) => state.formObject.currComponentId);
    const currSectionId = useSelector((state) => state.formObject.currSectionId);

    const dispatch = useDispatch();
    //find the section index in form_sections array
    const sectionIndex = formSectionsArray.findIndex(
        (section) => section.section_id === currSectionId
    );

    console.log("sclicked ", currComponentId)

    const handleComponentDelete = (e, componentId, sectionId) => {
        e.stopPropagation();
        localStorage.setItem(
            "currComponentId",
            formSectionsArray[sectionIndex].section_components[0].component_id
        );
        dispatch(setCurrComponent(formSectionsArray[sectionIndex].section_components[0].component_id));
        dispatch(removeSectionComponent({component_id: componentId, section_id: sectionId}));
    };


    return (
        <div
            className={`component ${currComponentId === component_id ? "selected" : ""}`}

        >

            <div className="drag-component-small">
                <DragIndicatorIcon fontSize="smaller"/>
            </div>
            <div className="container-3">
                <div className="component-logo">
                    {
                        //conditional rendering of icons
                        component_type === "checkboxes" ? (
                            <CheckCircleOutlineIcon
                                fontSize="smaller"
                                sx={{marginRight: "10px"}}
                            />
                        ) : component_type === "multiple_choice" ? (
                            <RadioButtonCheckedIcon
                                fontSize="smaller"
                                sx={{marginRight: "10px"}}
                            />
                        ) : component_type === "short_text" ? (
                            <ShortTextIcon fontSize="smaller" sx={{marginRight: "10px"}}/>
                        ) : component_type === "long_text" ? (
                            <SubjectIcon fontSize="smaller" sx={{marginRight: "10px"}}/>
                        ) : component_type === "dropdown" ? (
                            <ArrowDropDownCircleIcon
                                fontSize="smaller"
                                sx={{marginRight: "10px"}}
                            />
                        ) : component_type === "date" ? (
                            <EventIcon fontSize="smaller" sx={{marginRight: "10px"}}/>
                        ) : component_type === "time" ? (
                            <AccessTimeIcon fontSize="smaller" sx={{marginRight: "10px"}}/>
                        ) : component_type === "upload_file" ? (
                            <UploadFileIcon fontSize="smaller" sx={{marginRight: "10px"}}/>
                        ) : (
                            <div>no icon</div>
                        )
                    }

                </div>
                <h4 className="component-name">
                    {
                        //conditional rendering of text
                        component_type === "checkboxes"
                            ? "Checkboxes"
                            : component_type === "multiple_choice"
                                ? "Multiple Choice"
                                : component_type === "short_text"
                                    ? "Short Answer"
                                    : component_type === "long_text"
                                        ? "Paragraph"
                                        : component_type === "dropdown"
                                            ? "Dropdown"
                                            : component_type === "date"
                                                ? "Date"
                                                : component_type === "time"
                                                    ? "Time"
                                                    : component_type === "upload_file"
                                                        ? "File Upload"
                                                        : "No text"
                    }
                </h4>
            </div>
            <div
                className="delete-section-button"
                onClick={(event) => {
                    handleComponentDelete(event, component_id, currSectionId);
                }}
            >
                {<DeleteButton color="white"/>}
            </div>
        </div>
    );
};
