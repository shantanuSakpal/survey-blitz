import React from "react";
import { AddSectionButton } from "../buttons/AddSectionButton";
import { SectionComponent } from "./SectionComponent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  changeAddInputState,
  reorderSections,
  setCurrSectionId,
} from "../../reducers/formObjectReducer";

function FormComponents() {
  const formSectionsArray = useSelector(
    (state) => state.formObject.form_sections
  );

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formSectionsArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderSections(items));
  };

  const handleSectionClick = (sectionId) => {
    dispatch(setCurrSectionId(sectionId));
    dispatch(changeAddInputState(false));
    console.log("formSectionsArray --------> ", formSectionsArray);
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
                {formSectionsArray &&
                  formSectionsArray.map((component, index) => {
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
                              onClick={(event) => {
                                const target = event.target;
                                const deleteButton = target.closest(
                                  ".delete-section-button"
                                );
                                if (!deleteButton) {
                                  handleSectionClick(component.section_id);
                                }
                              }}
                            >
                              <SectionComponent
                                section_id={component.section_id}
                                index={index}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
                <AddSectionButton />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default FormComponents;
