import React from "react";
import { ComponentTreeItem } from "./ComponentTreeItem";
import { DeleteButton } from "../buttons/DeleteButton";

export const SectionComponent = ({
  section_id,
  removeSection,
  index,
  formComponentsArray,
  setFormComponentsArray,
}) => {
  return (
    <div id={section_id} className="component-tree-section-style">
      <div className="component-tree-section-header">
        <div className="component-tree-section-name">
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
