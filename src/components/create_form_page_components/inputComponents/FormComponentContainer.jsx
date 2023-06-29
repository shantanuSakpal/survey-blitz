import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {ShortTextInput} from "./ShortTextInput";
import {LongTextInput} from "./LongTextInput";
import {InputOptions} from "./InputOptions";
import {TimeInput} from "./TimeInput";
import {DateInput} from "./DateInput";
import {CheckboxInput} from "./CheckboxInput";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {handleComponentReorder} from "../../../reducers/formObjectReducer";
import {DropDown} from "./DropDown";
import {MultipleChoice} from "./MultipleChoice";
import {setCurrComponent} from "../../../reducers/formObjectReducer";

export const FormComponentContainer = ({component_id, component_type}) => {
    const currSectionId = useSelector((state) => state.formObject.currSectionId);
    const currComponentId = useSelector((state) => state.formObject.currComponentId);
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        const {source, destination} = result;

        // Check if the draggable item was dropped outside a droppable area
        if (!destination) return;

        // Dispatch an action to handle the drag and drop reordering
        dispatch(handleComponentReorder(source.index, destination.index));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="components">
                {(provided) => (
                    <div
                        className="form-component-container"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        onClick={() => {
                            dispatch(setCurrComponent(component_id));
                            console.log(currComponentId)
                        }}
                    >
                        {provided.placeholder}
                        <Draggable
                            draggableId="drag-component"
                            index={0} // Assuming it's the first component
                        >
                            {(provided) => (
                                <div
                                    className="drag-component"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <DragIndicatorIcon/>
                                </div>
                            )}
                        </Draggable>
                        {/* Render the component based on the component_type */}
                        {component_type === "short_text" ? (
                            <ShortTextInput
                                key={component_id}
                                component_id={component_id}
                                currSectionId={currSectionId}
                            />
                        ) : component_type === "long_text" ? (
                            <LongTextInput
                                key={component_id}
                                component_id={component_id}
                                currSectionId={currSectionId}
                            />
                        ) : component_type === "time" ? (
                            <TimeInput
                                key={component_id}
                                component_id={component_id}
                                currSectionId={currSectionId}
                            />
                        ) : component_type === "date" ? (
                            <DateInput
                                key={component_id}
                                component_id={component_id}
                                currSectionId={currSectionId}
                            />
                        ) : component_type === "checkboxes" ? (
                            <CheckboxInput
                                key={component_id}
                                component_id={component_id}
                                currSectionId={currSectionId}
                            />
                        ) : component_type === "dropdown" ? (
                            <DropDown
                                key={component_id}
                                component_id={component_id}
                                currSectionId={currSectionId}
                            />
                        ) : component_type === "multiple_choice" ? (
                            <MultipleChoice
                                key={component_id}
                                component_id={component_id}
                                currSectionId={currSectionId}
                            />
                        ) : (
                            <div>Component not found</div>
                        )}
                        <InputOptions
                            component_id={component_id}
                            currSectionId={currSectionId}
                            component_type={component_type}
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
