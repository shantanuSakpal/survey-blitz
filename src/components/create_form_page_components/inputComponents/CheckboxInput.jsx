import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setComponentPropObject } from "../../../reducers/formObjectReducer";
import { TextareaAutosize } from "@mui/base";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const CheckboxInput = ({ component_id, currSectionId }) => {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [component_prop_object, setComponent_prop_object] = useState({});
  const [checkboxLabels, setCheckboxLabels] = useState([]);

  const handleTextChange = (event) => {
    const updatedText = event.target.value;
    setText(updatedText);
    setComponent_prop_object({
      ...component_prop_object,
      question: updatedText,
    });
    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          question: updatedText,
        },
      })
    );
  };

  const handleLabelChange = (index, event) => {
    const updatedLabels = [...checkboxLabels];
    updatedLabels[index] = event.target.value;
    setCheckboxLabels(updatedLabels);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          checkboxes: updatedLabels,
        },
      })
    );
  };

  const handleAddCheckbox = () => {
    const updatedLabels = [...checkboxLabels];
    updatedLabels.push("");
    setCheckboxLabels(updatedLabels);
  };

  const handleRemoveCheckbox = (index) => {
    const updatedLabels = [...checkboxLabels];
    updatedLabels.splice(index, 1);
    setCheckboxLabels(updatedLabels);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          checkboxes: updatedLabels,
        },
      })
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedLabels = [...checkboxLabels];
    const [removed] = updatedLabels.splice(result.source.index, 1);
    updatedLabels.splice(result.destination.index, 0, removed);

    setCheckboxLabels(updatedLabels);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          checkboxes: updatedLabels,
        },
      })
    );
  };

  useEffect(() => {
    const currSection = formSectionsArray.find(
      (section) => section.section_id === currSectionId
    );

    if (currSection) {
      const currComponent = currSection.section_components.find(
        (component) => component.component_id === component_id
      );
      setComponent_prop_object(currComponent.component_prop_object);
      //if there is no question property, set it to an empty string
      if (!currComponent.component_prop_object.question) {
        setComponent_prop_object({
          ...currComponent.component_prop_object,
          question: "",
        });
      } else {
        setText(currComponent.component_prop_object.question);
      }

      //if there is no checkboxes property, set it to an empty array ]
      if (!currComponent.component_prop_object.checkboxes) {
        setComponent_prop_object({
          ...currComponent.component_prop_object,
          checkboxes: [],
        });
      } else {
        setCheckboxLabels(currComponent.component_prop_object.checkboxes);
      }
    }
  }, [formSectionsArray, currSectionId, component_id]);

  return (
    <>
      <div className="checkbox-input-container">
        <div className="form question">
          <TextareaAutosize
            className="input"
            placeholder="Question"
            value={text}
            onChange={handleTextChange}
            minRows={1}
          />
          <span className="input-border"></span>
        </div>
        <div className="checkboxes-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="checkboxes">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {checkboxLabels.map((label, index) => (
                    <Draggable
                      key={index}
                      draggableId={`checkbox-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="checkbox-container"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="drag-checkbox">
                            <DragIndicatorIcon />
                          </div>
                          <div className="checkbox-icon">
                            <CheckBoxOutlineBlankIcon />
                          </div>
                          <div className="checkbox-label">
                            <input
                              className="input"
                              type="text"
                              value={label}
                              placeholder="label"
                              onChange={(event) =>
                                handleLabelChange(index, event)
                              }
                            />
                            <span className="input-border"></span>
                          </div>
                          <div
                            className="checkbox-remove-button"
                            onClick={() => handleRemoveCheckbox(index)}
                          >
                            <CloseIcon />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div
            className="add-checkbox-button"
            onClick={() => {
              handleAddCheckbox();
            }}
          >
            Add Checkbox
          </div>
        </div>
      </div>
    </>
  );
};
