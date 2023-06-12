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
import { DeleteButton } from "../buttons/DeleteButton";

export const ComponentTreeItem = ({ type, id, setFormComponentsArray }) => {
  //a function to remove the component from the form using id
  const removeComponent = (id) => {
    setFormComponentsArray((prevFormComponentsArray) => {
      const updatedArray = prevFormComponentsArray.map((section) => {
        const updatedComponents = section.section_components.filter(
          (component) => component.input_id !== id
        );
        return {
          ...section,
          section_components: updatedComponents,
        };
      });
      return updatedArray;
    });
  };

  return (
    <div className="component-tree-item">
      <div style={{ display: "flex", alignItems: "center" }}>
        {
          //conditional rendering of icons
          type === "checkboxes" ? (
            <CheckCircleOutlineIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : type === "multiple_choice" ? (
            <RadioButtonCheckedIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : type === "short_text" ? (
            <ShortTextIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : type === "long_text" ? (
            <SubjectIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : type === "dropdown" ? (
            <ArrowDropDownCircleIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : type === "date" ? (
            <EventIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : type === "time" ? (
            <AccessTimeIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : type === "upload_file" ? (
            <UploadFileIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : (
            <div>no icon</div>
          )
        }
        <h4>{type}</h4>
      </div>
      <div
        id={type}
        onClick={
          //delete the item from the form
          () => {
            removeComponent(id);
          }
        }
      >
        <DeleteButton color="white" />
      </div>
    </div>
  );
};
