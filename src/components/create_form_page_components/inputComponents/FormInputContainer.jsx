import React from "react";
import { ShortTextInput } from "./ShortTextInput";
import { LongTextInput } from "./LongTextInput";
import { InputOptions } from "./InputOptions";
import { useSelector } from "react-redux";
import TimeInput from "./TimeInput";
import DateInput from "./DateInput";

export const FormInputContainer = ({ component_id, component_type }) => {
  const currSectionId = useSelector((state) => state.formObject.currSectionId);

  return (
    <div className="form-input-container">
      {
        //render the component based on the component_type
        component_type === "short_text" ? (
          <ShortTextInput
            key={component_id}
            component_id={component_id}
            currSectionId={currSectionId}
          />
        ) : component_type === "long_text" ? (
          <LongTextInput
            key={component_id}
            component_id={component_id}
            currSectionId={currSectionId}
          />
        ) : component_type === 'time' ? (
          <TimeInput 
          key = {component_id}
          component_id = {component_id}
          currSectionId = {currSectionId}
          />
        )
        : component_type   === 'date' ? (
          <DateInput
          key = {component_id}
          component_id = {component_id}
          currSectionId = {currSectionId}
          />
        ) : (
          <>Some other component</>
        )


      }
      <InputOptions
        component_id={component_id}
        currSectionId={currSectionId}
        component_type={component_type}
      />
    </div>
  );
};
