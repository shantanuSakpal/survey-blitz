import React from "react";
import {useSelector} from "react-redux";
import {ShortTextInput} from "./form_components/ShortTextInput";
import {LongTextInput} from "./form_components/LongTextInput";
import {TimeInput} from "./form_components/TimeInput";
import {DateInput} from "./form_components/DateInput";
import {CheckboxInput} from "./form_components/CheckboxInput";
import {DropDown} from "./form_components/DropDown";
import {MultipleChoice} from "./form_components/MultipleChoice";

function SectionContainer({currentSectionIndex, inputRefs}) {
    const formResponseObject = useSelector((state) => state.formResponseObject);
    const formSections = formResponseObject.form_sections;
    const currSectionId = formSections[currentSectionIndex].section_id;
    const currSectionComponentsArray =
        formSections[currentSectionIndex].section_components;

    return (
        <>
            {currSectionComponentsArray.map((component, index) => {
                return (
                    <div
                        ref={(el) => (inputRefs.current[index] = el)}
                        key={index}
                        className={`form-component-container ${formResponseObject?.theme}`}
                    >
                        {component.is_required && (
                            <div className="required-question">* Required</div>
                        )}
                        {component.component_type === "short_text" ? (
                            <ShortTextInput
                                key={component.component_id}
                                component={component}
                                currSectionId={currSectionId}
                            />
                        ) : component.component_type === "long_text" ? (
                            <LongTextInput
                                key={component.component_id}
                                component={component}
                                currSectionId={currSectionId}
                            />
                        ) : component.component_type === "checkboxes" ? (
                            <CheckboxInput
                                key={component.component_id}
                                component={component}
                                currSectionId={currSectionId}
                            />
                        ) : component.component_type === "multiple_choice" ? (
                            <MultipleChoice
                                key={component.component_id}
                                component={component}
                                currSectionId={currSectionId}
                            />
                        ) : component.component_type === "dropdown" ? (
                            <DropDown
                                key={component.component_id}
                                component={component}
                                currSectionId={currSectionId}
                            />
                        ) : component.component_type === "date" ? (
                            <DateInput
                                key={component.component_id}
                                component={component}
                                currSectionId={currSectionId}
                            />
                        ) : component.component_type === "time" ? (
                            <TimeInput
                                key={component.component_id}
                                component={component}
                                currSectionId={currSectionId}
                            />
                        ) : (
                            <div>Component not found</div>
                        )}
                    </div>
                );
            })}
        </>
    );
}

export default SectionContainer;
