import React from "react";
import { ShortTextInput } from "./ShortTextInput";
import { LongTextInput } from "./LongTextInput";
import { InputOptions } from "./InputOptions";

export const FormInputContainer = ({
  formComponentsArray,
  setFormComponentsArray,
  input_id,
  currSectionId,
  input_type,
}) => {
  return (
    <div className="form-input-container">
      {input_type === "short_text" && (
        <ShortTextInput
          key={input_id}
          input_id={input_id}
          setFormComponentsArray={setFormComponentsArray}
          formComponentsArray={formComponentsArray}
          currSectionId={currSectionId}
        />
      )}
      {input_type === "long_text" && (
        <LongTextInput
          key={input_id}
          input_id={input_id}
          setFormComponentsArray={setFormComponentsArray}
          formComponentsArray={formComponentsArray}
          currSectionId={currSectionId}
        />
      )}
      <InputOptions
        key={input_id}
        input_id={input_id}
        setFormComponentsArray={setFormComponentsArray}
        formComponentsArray={formComponentsArray}
        currSectionId={currSectionId}
      />
    </div>
  );
};
