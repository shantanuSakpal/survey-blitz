import React, { createContext, useState } from "react";
import { AddSectionButton } from "../buttons/AddSectionButton";
import { SectionComponent } from "./SectionComponent";
import AddInput from "./AddInput";

function FormComponents({
  formComponentsArray,
  addSection,
  removeSection,
  setFormComponentsArray,
}) {
  /* 
  the array formComponentsArray is of the form 
  [{section_id: <datetime in milisec> , section_components: []},
   ... ] 
  */

  const [currSectionId, setCurrSectionId] = useState(null);

  return (
    <>
      <AddInput
        currSectionId={currSectionId}
        setFormComponentsArray={setFormComponentsArray}
      />
      <div className="  left-column-container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            margin: "0.5rem 0",
          }}
        >
          <h3>Components</h3>
        </div>

        {formComponentsArray && (
          <div className="form-components-container">
            {formComponentsArray.map((component, index) => {
              return (
                <div key={index}>
                  <SectionComponent
                    section_id={component.section_id}
                    removeSection={removeSection}
                    formComponentsArray={formComponentsArray}
                    index={index}
                    setCurrSectionId={setCurrSectionId}
                    setFormComponentsArray={setFormComponentsArray}
                  />
                </div>
              );
            })}
            <AddSectionButton addSection={addSection} />
          </div>
        )}
      </div>
    </>
  );
}

export default FormComponents;
