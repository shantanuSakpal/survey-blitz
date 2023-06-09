import React from "react";
import { ShortTextInput } from "./inputComponents/ShortTextInput";
import { LongTextInput } from "./inputComponents/LongTextInput";

function FormDisplay({ formComponentsObj }) {
  return (
    <div className=" middle-column-container">
      <div>
        {formComponentsObj &&
          Object.entries(formComponentsObj).map(([key, value]) =>
            //for multiple choice , use the object created in edit input part by user to set the attributes of these mui inputs
            value === "short_text" ? (
              <div className="form-item">
                <ShortTextInput label={"Your Name"} placeholder={"e.g. Jhon"} />
              </div>
            ) : value === "long_text" ? (
              <div className="form-item">
                <LongTextInput
                  label={"About you"}
                  placeholder={"My name is ..."}
                />
              </div>
            ) : (
              <div className="form-item">some other component</div>
            )
          )}
      </div>
    </div>
  );
}

export default FormDisplay;
