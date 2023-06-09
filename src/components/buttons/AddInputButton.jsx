import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AddInput from "../create_form_page_components/AddInput";

export const AddInputButton = ({ setCurrSectionId, section_id }) => {
  //on click , toggle the .hide class on AddInput component

  return (
    <div
      className="add-input-button"
      onClick={() => {
        setCurrSectionId(section_id);
        // console.log("section id:", section_id);
      }}
    >
      <AddIcon fontSize="small" />
    </div>
  );
};
