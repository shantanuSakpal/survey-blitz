import React, { useState } from "react";
import { AddSectionButton } from "../buttons/AddSectionButton";
import { SectionComponent } from "./SectionComponent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function FormComponents({
  formComponentsArray,
  addSection,
  removeSection,
  setFormComponentsArray,
  setCurrSectionId,
  setAddInputState,
}) {
  /* 
  the array formComponentsArray is of the form 
  [{section_id: <datetime in milisec> , section_components: []},
  ... ] 
  */

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formComponentsArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormComponentsArray(items);
  };

  return (
    <>
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
                            <div
                              key={index}
                              onClick={() => {
                                console.log(
                                  "clicked on section ",
                                  component.section_id
                                );
                                setCurrSectionId(component.section_id);
                                setAddInputState(false);
                              }}
                            >
                              <SectionComponent
                                section_id={component.section_id}
                                removeSection={removeSection}
                                formComponentsArray={formComponentsArray}
                                index={index}
                                setCurrSectionId={setCurrSectionId}
                                setFormComponentsArray={setFormComponentsArray}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
                <AddSectionButton
                  addSection={addSection}
                  setCurrSectionId={setCurrSectionId}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default FormComponents;
