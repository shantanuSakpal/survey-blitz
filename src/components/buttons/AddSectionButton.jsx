import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const AddSectionButton = ({ addSection }) => {
  //add a section component to the formComponentsObj with key as current Date.now() and value as section

  return (
    <div
      className="add-section-button"
      onClick={() => {
        let date = Date.now();
        addSection({
          section_id: date,
          section_components: [],
          section_name: "",
        });
      }}
    >
      <AddBoxIcon fontSize="small" />
      <p>Add Section</p>
    </div>
  );
};
