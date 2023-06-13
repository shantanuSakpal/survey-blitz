import React, { useState } from "react";
import { DeleteButton } from "../../buttons/DeleteButton";

export const ShortTextInput = ({
  formComponentsArray,
  setFormComponentsArray,
  input_id,
  currSectionId,
  required,
}) => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    event.target.style.height = "auto"; // Reset the height
    event.target.style.height = `${event.target.scrollHeight}px`; // Set the height based on the content
  };
  return (
    <div className="short-text-input-container">
      <div class="form question">
        <textarea
          class="input"
          placeholder="Question"
          required={required}
          type="text"
          onChange={handleChange}
        />
        <span class="input-border"></span>
      </div>

      <div class="form answer">
        <input
          readOnly
          class="input"
          placeholder="Short text answer"
          required=""
          type="text"
        />
        <span class="input-border"></span>
      </div>
    </div>
  );
};
