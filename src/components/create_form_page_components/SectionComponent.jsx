import React, { useRef, useState } from "react";
import { AddInputButton } from "../buttons/AddInputButton";
import { CloseInputButton } from "../buttons/CloseInputButton";
import { ComponentTreeItem } from "./ComponentTreeItem";
import { DeleteButton } from "../buttons/DeleteButton";
import DoneIcon from "@mui/icons-material/Done";
import ConfirmDelete from "../modals/ConfirmDelete";

export const SectionComponent = ({
  section_id,
  removeSection,
  index,
  setCurrSectionId,
  formComponentsArray,
  setFormComponentsArray,
  handleAddComponentClick,
  addInputState,
}) => {
  return (
    <div id={section_id} className="section-style">
      <div className="section-header">
        <div className="section-name">
          {formComponentsArray[index].section_name}
        </div>
        <div
          className="delete-section-button"
          onClick={
            //delete the item from the form
            () => {
              removeSection(section_id);
              // console.log("deleted section id:", section_id);
            }
          }
        >
          {formComponentsArray.length > 1 && <DeleteButton color="white" />}
        </div>
      </div>

      <div>
        {formComponentsArray[index].section_components.map(
          (component, index) => {
            return (
              <div className="section-component" key={index}>
                <ComponentTreeItem
                  type={component.input_type}
                  formComponentsArray={formComponentsArray}
                  id={component.input_id}
                  setFormComponentsArray={setFormComponentsArray}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
