import React from "react";
import { useSelector } from "react-redux";
const IsRequiredToggle = ({ component_id, currSectionId }) => {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );
  //find isRequired property of currComponent
  const currComponent = formSectionsArray
    .find((section) => section.section_id === currSectionId)
    .section_components.find(
      (component) => component.component_id === component_id
    );
  const is_required = currComponent.is_required;

  return (
    <>
      <p>Required</p>
      <label className="toggle-switch">
        <input type="checkbox" defaultChecked={is_required} />
        <div className="toggle-switch-background">
          <div className="toggle-switch-handle"></div>
        </div>
      </label>
    </>
  );
};

export default IsRequiredToggle;
