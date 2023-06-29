import React from "react";
import {AddSectionButton} from "../buttons/AddSectionButton";
import {SectionComponent} from "./SectionComponent";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useSelector, useDispatch} from "react-redux";
import {

    reorderSections, setCurrComponent,
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
        const currSectionIndex = formSectionsArray.findIndex(
            (section) => section.section_id === sectionId
        );
        let currComponentId = null;
        if (formSectionsArray[currSectionIndex].section_components.length !== 0) {
            currComponentId = formSectionsArray[currSectionIndex].section_components[0].component_id
        }
        dispatch(setCurrSectionId(sectionId));
        localStorage.setItem("currSectionId", sectionId)
        dispatch(setCurrComponent(currComponentId))

    };


    return (
        <>
            <div className="left-column-container">

                <p>Components</p>


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
                                                        className={`section-component`}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        onClick={() => handleSectionClick(component.section_id)}
                                                    >

                                                        <SectionComponent
                                                            key={component.section_id}
                                                            section_id={component.section_id}
                                                            index={index}
                                                        />

                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <AddSectionButton/>

            </div>
        </>
    );
}

export default FormComponents;
