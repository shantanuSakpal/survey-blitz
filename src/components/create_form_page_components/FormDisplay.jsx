import React from "react";
import { useState } from "react";
import { CloseInputButton } from "../buttons/CloseInputButton";
import { AddInputButton } from "../buttons/AddInputButton";
import AddInput from "./AddInput";
import { SectionHeader } from "./inputComponents/SectionHeader";

function FormDisplay({
  formComponentsArray,
  currSectionId,
  setFormComponentsArray,
  addInputState,
  handleAddComponentClick,
}) {
  //render the section name and component name in form from the object
  // formComponentsArray

  //get the index of the section with the currentSectionId

  let index = formComponentsArray.findIndex(
    (section) => section.section_id === currSectionId
  );

  if (index === -1) {
    currSectionId = formComponentsArray[0].section_id;
    index = 0;
  }

  console.log(" currSectionId:", currSectionId);
  console.log(" index:", index);

  return (
    <div className=" middle-column-container">
      {
        //find the section with the currentSectionId from the formComponentsArray and render its name and components
        formComponentsArray &&
          formComponentsArray.map((section) => {
            if (section.section_id === currSectionId) {
              return (
                <div key={section.section_id}>
                  <div>
                    <SectionHeader
                      formComponentsArray={formComponentsArray}
                      setFormComponentsArray={setFormComponentsArray}
                      index={index}
                    />
                  </div>
                  {section.section_components.map((component) => {
                    {
                      /* if (component.component_type === "short_text_input") {
                      return (
                        <ShortTextInput
                          key={component.component_id}
                          component={component}
                        />
                      );
                    } else if (
                      component.component_type === "long_text_input"
                    ) {
                      return (
                        <LongTextInput
                          key={component.component_id}
                          component={component}
                        />
                      );
                    } */
                    }
                    return (
                      <div key={component.input_id}>{component.input_type}</div>
                    );
                  })}
                  {
                    //if addInputState is true, then show the AddInput component
                    addInputState ? (
                      <CloseInputButton
                        handleAddComponentClick={handleAddComponentClick}
                        section_id={currSectionId}
                      />
                    ) : (
                      <AddInputButton
                        id={"addInput_" + currSectionId}
                        handleAddComponentClick={handleAddComponentClick}
                        section_id={currSectionId}
                      />
                    )
                  }
                  <AddInput
                    currSectionId={currSectionId}
                    setFormComponentsArray={setFormComponentsArray}
                    handleAddComponentClick={handleAddComponentClick}
                  />
                </div>
              );
            }
          })
      }
    </div>
  );
}

export default FormDisplay;
