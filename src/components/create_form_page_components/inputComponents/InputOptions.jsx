import React from "react";
import { DeleteButton } from "../../buttons/DeleteButton";

export const InputOptions = ({
  formComponentsArray,
  setFormComponentsArray,
  input_id,
  currSectionId,
}) => {
  return (
    <div className="input-options-container">
      <div
        className="delete-input-button"
        //delete the component from the formComponentsArray using the input_id and the currSectionId
        onClick={() => {
          const updatedFormComponentsArray = formComponentsArray.map(
            (section) => {
              if (section.section_id === currSectionId) {
                section.section_components = section.section_components.filter(
                  (component) => component.input_id !== input_id
                );
              }
              return section;
            }
          );
          setFormComponentsArray(updatedFormComponentsArray);
        }}
      >
        <DeleteButton />
      </div>
    </div>
  );
};
