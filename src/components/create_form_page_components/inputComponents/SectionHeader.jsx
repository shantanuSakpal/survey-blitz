import React from "react";

export const SectionHeader = ({
  formComponentsArray,
  setFormComponentsArray,
  index,
}) => {
  return (
    <div className="section-header">
      <div className="section-name">
        <input
          className="section-name-input"
          id="section_name"
          required=""
          type="text"
          onClick={(e) => {
            if (e.target) {
              e.target.setSelectionRange(0, e.target.value.length);
            }
          }}
          value={formComponentsArray[index].section_name}
          onChange={(e) => {
            const updatedArray = [...formComponentsArray];
            updatedArray[index].section_name = e.target.value;
            setFormComponentsArray(updatedArray);
          }}
        />
        <span class="section-name-highlight"></span>
        <span class="section-name-bar"></span>
        <label>Section Name</label>
      </div>
    </div>
  );
};
