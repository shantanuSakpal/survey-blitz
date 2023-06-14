import React from "react";
import { CloseInputButton } from "../buttons/CloseInputButton";
import { AddInputButton } from "../buttons/AddInputButton";
import AddInput from "./AddInput";
import { SectionHeader } from "./inputComponents/SectionHeader";
import { FormInputContainer } from "./inputComponents/FormInputContainer";
import { useSelector } from "react-redux";

function FormDisplay({}) {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  const currSectionId = useSelector((state) => state.formObject.currSectionId);

  const addInputState = useSelector((state) => state.formObject.addInputState);

  /* 
  the array formSectionsArray is of the form 
  [{section_id: <datetime in milisec> , section_components: []},
  ... ] 
  */

  return (
    <div className=" middle-column-container">
      {
        //find the section with the currentSectionId from the formSectionsArray and render its name and components
        formSectionsArray &&
          formSectionsArray.map((section) => {
            if (section.section_id === currSectionId) {
              return (
                <div key={section.section_id}>
                  <div>
                    <SectionHeader />
                  </div>
                  {section.section_components.map((component) => (
                    <FormInputContainer
                      key={component.component_id}
                      component_id={component.component_id}
                      component_type={component.component_type}
                    />
                  ))}
                  {
                    //if addInputState is true, then show the AddInput component
                    addInputState ? (
                      <CloseInputButton />
                    ) : (
                      <AddInputButton currSectionId={currSectionId} />
                    )
                  }
                  <AddInput />
                </div>
              );
            }
          })
      }
    </div>
  );
}

export default FormDisplay;
