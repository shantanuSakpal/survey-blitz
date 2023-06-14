import React from "react";
import { ComponentTreeItem } from "./ComponentTreeItem";
import { DeleteButton } from "../buttons/DeleteButton";
import { useDispatch } from "react-redux";
import {
  removeSection,
  setCurrSectionId,
} from "../../reducers/formObjectReducer";
import { useSelector } from "react-redux";

export const SectionComponent = ({ section_id, index }) => {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );
  const currSectionId = useSelector((state) => state.formObject.currSectionId);

  const dispatch = useDispatch();

  return (
    <div id={section_id} className="component-tree-section-style">
      <div className="component-tree-section-header">
        <div className="component-tree-section-name">
          {formSectionsArray[index].section_name}
        </div>
        <div
          className="delete-section-button"
          onClick={
            //delete the item from the form
            () => {
              dispatch(removeSection(section_id));
              // If the component being removed is the current component, set the current component to the first component

              if (section_id === currSectionId) {
                dispatch(setCurrSectionId(formSectionsArray[0].section_id));
              }

              // console.log("deleted section id:", section_id);
            }
          }
        >
          {formSectionsArray.length > 1 && <DeleteButton color="white" />}
        </div>
      </div>

      <div>
        {formSectionsArray[index].section_components.map((component, index) => {
          return (
            <div className="section-component" key={index}>
              <ComponentTreeItem
                component_id={component.component_id}
                component_type={component.component_type}
                section_id={section_id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
