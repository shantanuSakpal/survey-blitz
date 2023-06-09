import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AddInputButton } from "../buttons/AddInputButton";

export const SectionComponent = ({
  section_id,
  removeSection,
  index,
  setCurrSectionId,
  formComponentsArray,
}) => {
  return (
    <div id={section_id} className="section-style">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid grey",
          padding: "0 10px",
        }}
      >
        <span>Section {index + 1}</span>
        <div
          onClick={
            //delete the item from the form
            () => {
              removeSection(section_id);
              // console.log("deleted section id:", section_id);
            }
          }
        >
          <DeleteForeverIcon
            fontSize="small"
            sx={{
              ":hover": { cursor: "pointer" },
            }}
          />
        </div>
      </div>

      <div className="section-components">
        {formComponentsArray[index].section_components.map(
          (component, index) => {
            return (
              <div className="section-component" key={index}>
                <p>{component.input_type}</p>
              </div>
            );
          }
        )}

        <AddInputButton
          setCurrSectionId={setCurrSectionId}
          section_id={section_id}
        />
      </div>
    </div>
  );
};
