import React, { useRef, useState } from "react";
import { AddInputButton } from "../buttons/AddInputButton";
import { CloseInputButton } from "../buttons/CloseInputButton";
import { ComponentTreeItem } from "./ComponentTreeItem";
import { DeleteButton } from "../buttons/DeleteButton";
import DoneIcon from "@mui/icons-material/Done";

export const SectionComponent = ({
  section_id,
  removeSection,
  index,
  setCurrSectionId,
  formComponentsArray,
  setFormComponentsArray,
  handleAddComponentClick,
  addInputState,
}) => {
  const [inputValue, setInputValue] = useState(
    formComponentsArray[index].section_name
  );
  const [showButton, setShowButton] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = () => {
    setShowButton(true);
  };

  const handleSaveClick = () => {
    const updatedArray = [...formComponentsArray];
    updatedArray[index].section_name = inputValue;
    setFormComponentsArray(updatedArray);
    setShowButton(false);
    inputRef.current.blur();
  };

  return (
    <div id={section_id} className="section-style">
      <div className="section-header">
        <input
          ref={inputRef}
          id="section_name"
          placeholder="tap to edit section name"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        {showButton && (
          <button className="done-button" onClick={handleSaveClick}>
            <DoneIcon />
          </button>
        )}

        <div
          className="delete-section-button"
          onClick={
            //delete the item from the form
            () => {
              removeSection(section_id);
              // console.log("deleted section id:", section_id);
            }
          }
        >
          <DeleteButton color="white" />
        </div>
      </div>

      <div>
        {formComponentsArray[index].section_components.map(
          (component, index) => {
            return (
              <div className="section-component" key={index}>
                <ComponentTreeItem
                  type={component.input_type}
                  formComponentsArray={formComponentsArray}
                  id={component.input_id}
                  setFormComponentsArray={setFormComponentsArray}
                />
              </div>
            );
          }
        )}
        {
          //if addInputState is true, then show the AddInput component
          addInputState ? (
            <CloseInputButton
              handleAddComponentClick={handleAddComponentClick}
              section_id={section_id}
            />
          ) : (
            <AddInputButton
              id={"addInput_" + section_id}
              handleAddComponentClick={handleAddComponentClick}
              setCurrSectionId={setCurrSectionId}
              section_id={section_id}
            />
          )
        }
      </div>
    </div>
  );
};
