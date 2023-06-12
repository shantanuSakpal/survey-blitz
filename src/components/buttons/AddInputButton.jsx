import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";

export const AddInputButton = ({
  setCurrSectionId,
  section_id,
  handleAddComponentClick,
}) => {
  //on click , toggle the .hide class on AddInput component

  return (
    <div
      className="add-input-button"
      onClick={() => {
        setCurrSectionId(section_id);
        // console.log("section id:", section_id);
        //toggle the .hide class on AddInput component

        document.querySelector("#addInput").classList.toggle("hide");
        handleAddComponentClick();
      }}
    >
      <AddIcon fontSize="small" />
    </div>
  );
};
