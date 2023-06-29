import React, {useState} from "react";
import {AddSectionButton} from "../buttons/AddSectionButton";
import {SectionComponent} from "./SectionComponent";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useSelector, useDispatch} from "react-redux";
import {
    changeAddInputState,
    reorderSections,
    setCurrSectionId,
} from "../../reducers/formObjectReducer";
import {AddInputButton} from "../buttons/AddInputButton";
import AddInput from "./AddInput";
import {CloseInputButton} from "../buttons/CloseInputButton";


function FormComponents() {
    const formSectionsArray = useSelector(
        (state) => state.formObject.form_sections
    );

    const formObject = useSelector((state) => state.formObject);

    const currSectionId = formObject.currSectionId;
    const addInputState = formObject.addInputState;

    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(formSectionsArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(reorderSections(items));
    };

    const [selectedSectionId, setSelectedSectionId] = useState(currSectionId);

    const handleSectionClick = (sectionId) => {
        dispatch(setCurrSectionId(sectionId));
        dispatch(changeAddInputState(false));
        setSelectedSectionId(sectionId);
        console.log("formObject --------> ", formObject);
    };

    return (
        <>
            <div className="left-column-container">
                <div className="add-input-button-container">
                    <h3>Components</h3>
                    <div className="add-input-container">

                        <AddInput/>
                        {
                            //if addInputState is true, then show the AddInput component
                            addInputState ? (
                                <CloseInputButton/>
                            ) : (
                                <AddInputButton currSectionId={currSectionId}/>
                            )
                        }
                        {/*<h3>*/}
                        {/*    Add Input to Section*/}
                        {/*</h3>*/}
                    </div>
                </div>
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
                                        const isSelected = component.section_id === selectedSectionId;
                                        return (
                                            <Draggable
                                                key={component.section_id}
                                                draggableId={component.section_id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        className={`section-component ${isSelected ? "selected" : ""}`}
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
                                <AddSectionButton/>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    );
}

export default FormComponents;
