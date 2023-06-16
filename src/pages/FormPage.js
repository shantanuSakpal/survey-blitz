import React, {useState} from "react";
import {useSelector} from "react-redux";

export const FormPage = () => {
    //import the form object state
    const formResponseObject = useSelector((state) => state.formResponseObject);
    console.log(formResponseObject);

    const formSections = formResponseObject.form_sections;
    console.log(formSections);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);


    return (
        formResponseObject && (
            <div className="form-container">
                <div className="form-name">
                    {formResponseObject.form_name}
                </div>
                {formSections.map((section, index) => {
                    if (index === currentSectionIndex) {
                        return (
                            <div key={section.section_id}>
                                <h1>{section.section_name}</h1>
                                {/* Render the components for this section */}
                                {section.section_components.map((component) => (
                                    <div key={component.component_id}>
                                        <h2>{component.component_type}</h2>
                                        <h3>{component.component_prop_object.question}</h3>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return null;
                })}
                {currentSectionIndex > 0 && (
                    <button onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}>
                        Previous
                    </button>
                )}
                {currentSectionIndex < formSections.length - 1 && (
                    <button onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}>
                        Next
                    </button>
                )}


            </div>


        )
    )
};
