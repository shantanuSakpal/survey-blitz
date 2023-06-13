import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import { addSection, setCurrSectionId } from "../../reducers/formObjectReducer";

export const AddSectionButton = () => {
  //add a section component to the formComponentsObj with key as current Date.now() and value as section
  const dispatch = useDispatch();

  return (
    <div
      className="add-section-button"
      onClick={() => {
        let date = Date.now();
        dispatch(
          addSection({
            section_id: date,
            section_name: "Untitled Section",
            section_components: [],
          })
        );
        dispatch(setCurrSectionId(date));
      }}
    >
      <AddBoxIcon fontSize="small" />
      <p>Add Section</p>
    </div>
  );
};
