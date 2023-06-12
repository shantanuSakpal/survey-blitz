import React from "react";

export const SectionHeader = ({
  formComponentsArray,
  setFormComponentsArray,
  index,
}) => {
  return (
    <div className="section-header">
      <div>
        <input
          id="section_name"
          placeholder="tap to edit section name"
          value={formComponentsArray[index].section_name}
          onChange={(e) => {
            const updatedArray = [...formComponentsArray];
            updatedArray[index].section_name = e.target.value;
            setFormComponentsArray(updatedArray);
          }}
        />
      </div>
    </div>
  );
};
