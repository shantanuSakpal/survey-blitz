import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";


export const CloseInputButton = () => {


  return (
    <div
      className="add-input-button"
      onClick={() => {
        //toggle the .hide class on AddInput component

        document.querySelector("#addInput").classList.toggle("hide");
      }}
    >
      <CloseIcon fontSize="small" />
    </div>
  );
};
