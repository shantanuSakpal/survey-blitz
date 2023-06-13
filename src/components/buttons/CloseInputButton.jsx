import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { changeAddInputState } from "../../reducers/formObjectReducer";
import { useSelector } from "react-redux";

export const CloseInputButton = () => {
  //on click , toggle the .hide class on AddInput component
  const addInputState = useSelector((state) => state.formObject.addInputState);

  const dispatch = useDispatch();

  return (
    <div
      className="add-input-button"
      onClick={() => {
        //toggle the .hide class on AddInput component

        document.querySelector("#addInput").classList.toggle("hide");
        dispatch(changeAddInputState(!addInputState));
      }}
    >
      <CloseIcon fontSize="small" />
    </div>
  );
};
