import React from "react";
import { DeleteButton } from "../../buttons/DeleteButton";
import { useDispatch } from "react-redux";
import { removeSectionComponent } from "../../../reducers/formObjectReducer";

export const InputOptions = ({ component_id, currSectionId }) => {
  const dispatch = useDispatch();

  return (
    <div className="input-options-container">
      <div
        className="delete-input-button"
        //delete the component from the formComponentsArray using the input_id and the currSectionId
        onClick={() => {
          dispatch(
            removeSectionComponent({
              component_id: component_id,
              section_id: currSectionId,
            })
          );
        }}
      >
        <DeleteButton />
      </div>
    </div>
  );
};
