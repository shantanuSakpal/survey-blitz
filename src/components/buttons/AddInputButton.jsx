import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { changeAddInputState } from "../../reducers/formObjectReducer";
import { useSelector } from "react-redux";

export const AddInputButton = () => {
  //on click , toggle the .hide class on AddInput
  const addInputState = useSelector((state) => state.formObject.addInputState);

  const dispatch = useDispatch();
  return (
    <div
      className="add-input-button"
      onClick={() => {
        // console.log("section id:", section_id);
        //toggle the .hide class on AddInput component

        document.querySelector("#addInput").classList.toggle("hide");
        dispatch(changeAddInputState(!addInputState));
      }}
    >
      <AddIcon fontSize="small" />
    </div>
  );
};
