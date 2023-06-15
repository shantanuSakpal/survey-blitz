import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setComponentPropObject } from "../../../reducers/formObjectReducer";
import { TextareaAutosize } from "@mui/base";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const MultipleChoice = ({ component_id, currSectionId }) => {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [component_prop_object, setComponent_prop_object] = useState({});
  const [choices, setChoices] = useState([]);

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

  const handleChoiceChange = (index, event) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = event.target.value;
    setChoices(updatedChoices);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          choices: updatedChoices,
        },
      })
    );
  };

  const handleAddChoice = () => {
    const updatedChoices = [...choices];
    updatedChoices.push("");
    setChoices(updatedChoices);
  };

  const handleRemoveChoice = (index) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          choices: updatedChoices,
        },
      })
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedChoices = Array.from(choices);
    const [removed] = updatedChoices.splice(result.source.index, 1);
    updatedChoices.splice(result.destination.index, 0, removed);

    setChoices(updatedChoices);

    dispatch(
      setComponentPropObject({
        component_id: component_id,
        section_id: currSectionId,
        component_prop_object: {
          ...component_prop_object,
          choices: updatedChoices,
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

      // If there is no choices property, set it to an empty array
      if (!currComponent.component_prop_object.choices) {
        setComponent_prop_object({
          ...currComponent.component_prop_object,
          choices: [],
        });
      } else {
        setChoices(currComponent.component_prop_object.choices);
      }
    }
  }, [formSectionsArray, currSectionId, component_id]);

  return (
    <>
      <div className="multiple-choice-input-container">
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
        <div className="choices-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="choices">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {choices.map((choice, index) => (
                    <Draggable
                      key={index}
                      draggableId={`choice-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`choice-container ${
                            index === 0 ? "first-choice" : ""
                          }`}
                        >
                          <div
                            className="drag-choice"
                            {...provided.dragHandleProps}
                          >
                            <DragIndicatorIcon />
                          </div>
                          <div className="choice-icon">
                            <RadioButtonUncheckedIcon />
                          </div>
                          <div className="choice-label">
                            <input
                              className="input"
                              type="text"
                              value={choice}
                              placeholder="Choice"
                              onChange={(event) =>
                                handleChoiceChange(index, event)
                              }
                            />
                            <span className="input-border"></span>
                          </div>

                          <div
                            className="choice-remove-button"
                            onClick={() => handleRemoveChoice(index)}
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
            className="add-choice-button"
            onClick={() => {
              handleAddChoice();
            }}
          >
            Add Choice
          </div>
        </div>
      </div>
    </>
  );
};
