import React, { useState } from "react";
import { DeleteButton } from "../../buttons/DeleteButton";

export const ShortTextInput = ({ component_id, currSectionId }) => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    event.target.style.height = "auto"; // Reset the height
    event.target.style.height = `${event.target.scrollHeight}px`; // Set the height based on the content
  };
  return (
    <div className="short-text-input-container">
      <div className="form question">
        <textarea
          className="input"
          placeholder="Question"
          type="text"
          onChange={handleChange}
        />
        <span className="input-border"></span>
      </div>

      <div className="form answer">
        <input
          readOnly
          className="input"
          placeholder="Short text answer"
          required=""
          type="text"
        />
        <span className="input-border"></span>
      </div>
    </div>
  );
};
