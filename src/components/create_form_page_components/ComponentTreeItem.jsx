//this component holds the item that the user has selected to add to the form , so this is like the body of the item, just pass the name

import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const ComponentTreeItem = (props) => {
  return (
    <div className="component-tree-item">
      <div style={{ display: "flex", alignItems: "center" }}>
        {
          //conditional rendering of icons
          props.name === "checkboxes" ? (
            <CheckCircleOutlineIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : props.name === "multiple_choice" ? (
            <RadioButtonCheckedIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : props.name === "short_text" ? (
            <ShortTextIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : props.name === "long_text" ? (
            <SubjectIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : props.name === "dropdown" ? (
            <ArrowDropDownCircleIcon
              fontSize="small"
              sx={{ marginRight: "10px" }}
            />
          ) : props.name === "date" ? (
            <EventIcon fontSize="small" />
          ) : props.name === "time" ? (
            <AccessTimeIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : props.name === "upload_file" ? (
            <UploadFileIcon fontSize="small" sx={{ marginRight: "10px" }} />
          ) : (
            <div>no icon</div>
          )
        }
        <h4>{props.name}</h4>
      </div>
      <div
        id={props.name}
        onClick={
          //delete the item from the form
          () => {
            console.log("delete clicked");
            console.log(props.date);
            props.removeClickedComponent(props.date);
          }
        }
      >
        <DeleteForeverIcon fontSize="small" sx={{ marginRight: "10px" }} />
      </div>
    </div>
  );
};
