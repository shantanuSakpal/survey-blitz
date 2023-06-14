import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setComponentPropObject } from "../../../../reducers/formObjectReducer";

export const TextInputMoreOptions = ({ component_id, currSectionId }) => {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  // Find the component in the formSectionsArray
  const currComponent = formSectionsArray
    .find((section) => section.section_id === currSectionId)
    .section_components.find(
      (component) => component.component_id === component_id
    );

  const dispatch = useDispatch();
  console.log(currComponent);

  return (
    <div className="more-options-container">
      <div
        className="more-options-item"
        onClick={() => {
          //set the description property of currComponent.component_prop_object to true or toggle it
          dispatch(
            setComponentPropObject({
              component_id: component_id,
              section_id: currSectionId,
              component_prop_object: {
                ...currComponent.component_prop_object,
                description: !currComponent.component_prop_object.description,
              },
            })
          );
        }}
      >
        Add Description
      </div>
      <div className="more-options-item">Validate Responses</div>
    </div>
  );
};
