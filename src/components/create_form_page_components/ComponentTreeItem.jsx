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
import { useDispatch } from "react-redux";
import { removeSectionComponent } from "../../reducers/formObjectReducer";

export const ComponentTreeItem = ({
  component_type,
  component_id,
  section_id,
}) => {
  //a function to remove the component from the form using component_id
  const dispatch = useDispatch();

  return (
    <div className="component-tree-item">
      <div style={{ display: "flex", alignItems: "center" }}>
        {
          //conditional rendering of icons
          component_type === "checkboxes" ? (
            <CheckCircleOutlineIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : component_type === "multiple_choice" ? (
            <RadioButtonCheckedIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : component_type === "short_text" ? (
            <ShortTextIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : component_type === "long_text" ? (
            <SubjectIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : component_type === "dropdown" ? (
            <ArrowDropDownCircleIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : component_type === "date" ? (
            <EventIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : component_type === "time" ? (
            <AccessTimeIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : component_type === "upload_file" ? (
            <UploadFileIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : (
            <div>no icon</div>
          )
        }
        <h4>{component_type}</h4>
      </div>
      <div
        onClick={
          //delete the item from the form
          () => {
            dispatch(
              removeSectionComponent({
                component_id: component_id,
                section_id: section_id,
              })
            );
          }
        }
      >
        <DeleteButton color="white" />
      </div>
    </div>
  );
};
