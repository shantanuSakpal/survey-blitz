import React from "react";
import {AddSectionButton} from "../buttons/AddSectionButton";
import {SectionComponent} from "./SectionComponent";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useSelector, useDispatch} from "react-redux";
import {
    reorderSections,
    reorderComponents,
    setCurrComponent,
    setCurrSectionId,
} from "../../reducers/formObjectReducer";
import {AddInputButton} from "../buttons/AddInputButton";
import {Component} from "./Component";

function FormComponents() {
    const formObject = useSelector((state) => state.formObject);
    const formSectionsArray = formObject?.form_sections;
    const currSectionId = formObject?.currSectionId;
    const currentSection = formSectionsArray?.find(
        (section) => section.section_id === currSectionId
    );


    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(formSectionsArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(reorderSections(items));
    };

    const onDragEndComponent = (result) => {
        if (!result.destination) return;
        const sourceSectionId = parseInt(result.source.droppableId);
        const destinationSectionId = parseInt(result.destination.droppableId);

        if (sourceSectionId === destinationSectionId) {
            const updatedComponents = Array.from(
                currentSection.section_components
            );
            const [reorderedComponent] = updatedComponents.splice(
                result.source.index,
                1
            );
            updatedComponents.splice(result.destination.index, 0, reorderedComponent);

            dispatch(
                reorderComponents({
                    section_id: destinationSectionId,
                    section_components: updatedComponents,
                })
            );
        } else {
            const sourceComponents = Array.from(
                currentSection.section_components
            );
            const destinationComponents = Array.from(
                formSectionsArray.find((section) => section.section_id === destinationSectionId).section_components
            );

            const [reorderedComponent] = sourceComponents.splice(
                result.source.index,
                1
            );

            destinationComponents.splice(result.destination.index, 0, reorderedComponent);

            const updatedSections = formSectionsArray.map((section) => {
                if (section.section_id === sourceSectionId) {
                    return {...section, section_components: sourceComponents};
                } else if (section.section_id === destinationSectionId) {
                    return {...section, section_components: destinationComponents};
                } else {
                    return section;
                }
            });

            dispatch(reorderSections(updatedSections));
        }
    };

    const handleSectionClick = (sectionId) => {

        const currSectionIndex = formSectionsArray.findIndex(
            (section) => section.section_id === sectionId
        );
        let currComponentId = null;
        if (
            formSectionsArray[currSectionIndex].section_components.length !== 0
        ) {
            currComponentId =
                formSectionsArray[currSectionIndex].section_components[0].component_id;
        }
        dispatch(setCurrSectionId(sectionId));
        localStorage.setItem("currSectionId", sectionId);

        dispatch(setCurrComponent(currComponentId));
    };

    const handleComponentClick = (componentId) => {
        dispatch(setCurrComponent(componentId));
        localStorage.setItem("currComponentId", componentId);
    };

    return (
        <>
            <div className="left-column-container">
                <div className="sections-container">
                    <div className="container-1">
                        <p>Pages</p>
                        <AddSectionButton/>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="container-2">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="container-2"
                                >
                                    {formSectionsArray &&
                                        formSectionsArray.map((section, index) => {
                                            return (
                                                <Draggable
                                                    key={section.section_id}
                                                    draggableId={section.section_id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            className={`section-component`}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            onClick={() => handleSectionClick(section.section_id)}
                                                        >
                                                            <SectionComponent
                                                                key={section.section_id}
                                                                section_id={section.section_id}
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
                </div>

                <div className="section-components-container">
                    <div className="container-1">
                        <p>Page Components</p>
                        <AddInputButton/>
                    </div>
                    <div className="container-2">
                        {currentSection &&
                            <DragDropContext
                                onDragEnd={onDragEndComponent}>
                                <Droppable droppableId={currentSection.section_id.toString()}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {currentSection.section_components.map((component, index) => (
                                                <Draggable

                                                    key={component.component_id}
                                                    draggableId={component.component_id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            className="section-component"
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            onClick={() => handleComponentClick(component.component_id)}
                                                        >
                                                            <Component
                                                                key={component.component_id}
                                                                component_type={component.component_type}
                                                                component_id={component.component_id}

                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormComponents;
