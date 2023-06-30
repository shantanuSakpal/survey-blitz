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
import {useDispatch, useSelector} from "react-redux";
import {removeSectionComponent, setCurrSectionId} from "../../reducers/formObjectReducer";

export const ComponentTreeItem = ({
                                      component_type,
                                      component_id,
                                      section_id,
                                  }) => {
    //a function to remove the component from the form using component_id
    const dispatch = useDispatch()
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    // Find the component in the formSectionsArray
    const currSection = formSectionsArray
        .find((section) => section.section_id === section_id)

    return (
        <div className="component-tree-item">
            <div className="component-tree-item-logo">
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
                <h4>
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
            {/*<div*/}
            {/*    className="delete-section-button"*/}
            {/*    onClick={*/}
            {/*        //delete the item from the form*/}
            {/*        () => {*/}
            {/*            if (currSection.section_components.length > 1)*/}
            {/*                dispatch(*/}
            {/*                    removeSectionComponent({*/}
            {/*                        component_id: component_id,*/}
            {/*                        section_id: section_id,*/}
            {/*                    }));*/}
            {/*            else*/}

            {/*                alert("There must be at least one input in a page");*/}


            {/*        }*/}
            {/*    }*/}
            {/*>*/}
            {/*    <DeleteButton/>*/}
            {/*</div>*/}
        </div>
    );
};
