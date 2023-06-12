import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const CloseInputButton = ({ handleAddComponentClick, section_id }) => {
  //on click , toggle the .hide class on AddInput component

  return (
    <div
      id={section_id}
      className="add-input-button"
      onClick={() => {
        //toggle the .hide class on AddInput component

        document.querySelector("#addInput").classList.toggle("hide");
        handleAddComponentClick();
      }}
    >
      <CloseIcon fontSize="small" />
    </div>
  );
};
