import React, { createContext, useState } from "react";
import { AddSectionButton } from "../buttons/AddSectionButton";
import { SectionComponent } from "./SectionComponent";
import AddInput from "./AddInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function FormComponents({
  formComponentsArray,
  addSection,
  removeSection,
  setFormComponentsArray,
}) {
  /* 
  the array formComponentsArray is of the form 
  [{section_id: <datetime in milisec> , section_components: []},
  ... ] 
  */
  const [addInputState, setAddInputState] = useState(false); // Track the visibility of AddInput component

  const handleAddComponentClick = () => {
    setAddInputState(!addInputState); // Toggle the visibility of AddInput component
  };

  const [currSectionId, setCurrSectionId] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formComponentsArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormComponentsArray(items);
  };

  return (
    <>
      <AddInput
        currSectionId={currSectionId}
        setFormComponentsArray={setFormComponentsArray}
      />
      <div className="left-column-container">
        <h3>Components</h3>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="form-components-container">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="form-components-container"
              >
                {formComponentsArray &&
                  formComponentsArray.map((component, index) => {
                    return (
                      <Draggable
                        key={component.section_id}
                        draggableId={component.section_id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div key={index}>
                              <SectionComponent
                                section_id={component.section_id}
                                removeSection={removeSection}
                                formComponentsArray={formComponentsArray}
                                index={index}
                                setCurrSectionId={setCurrSectionId}
                                setFormComponentsArray={setFormComponentsArray}
                                handleAddComponentClick={
                                  handleAddComponentClick
                                }
                                addInputState={addInputState}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
                <AddSectionButton addSection={addSection} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default FormComponents;
