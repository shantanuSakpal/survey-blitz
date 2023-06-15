import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setComponentPropObject } from "../../../reducers/formObjectReducer";
import { TextareaAutosize } from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const DropDown = ({ component_id, currSectionId }) => {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [component_prop_object, setComponent_prop_object] = useState({});
  const [options, setOptions] = useState([]);

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

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = event.target.value;
    setOptions(updatedOptions);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          options: updatedOptions,
        },
      })
    );
  };

  const handleAddOption = () => {
    const updatedOptions = [...options];
    updatedOptions.push("");
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          options: updatedOptions,
        },
      })
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedOptions = [...options];
    const [removed] = updatedOptions.splice(result.source.index, 1);
    updatedOptions.splice(result.destination.index, 0, removed);

    setOptions(updatedOptions);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          options: updatedOptions,
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
      // If there is no question property, set it to an empty string
      if (!currComponent.component_prop_object.question) {
        setComponent_prop_object({
          ...currComponent.component_prop_object,
          question: "",
        });
      } else {
        setText(currComponent.component_prop_object.question);
      }

      // If there are no options, set it to an empty array
      if (!currComponent.component_prop_object.options) {
        setComponent_prop_object({
          ...currComponent.component_prop_object,
          options: [],
        });
      } else {
        setOptions(currComponent.component_prop_object.options);
      }
    }
  }, [formSectionsArray, currSectionId, component_id]);

  return (
    <>
      <div className="dropdown-input-container">
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
        <div className="options-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="options">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {options.map((option, index) => (
                    <Draggable
                      key={index}
                      draggableId={`option-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="option-container"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="drag-option">
                            <DragIndicatorIcon />
                          </div>
                          <div className="option-number">{index + 1}.</div>
                          <div className="option-label">
                            <input
                              className="input"
                              type="text"
                              value={option}
                              placeholder="Option"
                              onChange={(event) =>
                                handleOptionChange(index, event)
                              }
                            />
                            <span className="input-border"></span>
                          </div>
                          <div
                            className="option-remove-button"
                            onClick={() => handleRemoveOption(index)}
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
            className="add-option-button"
            onClick={() => {
              handleAddOption();
            }}
          >
            Add Option
          </div>
        </div>
      </div>
    </>
  );
};
