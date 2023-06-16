import React from 'react';
import {useSelector} from "react-redux";

function SectionContainer({currentSectionIndex}) {
    const formResponseObject = useSelector((state) => state.formResponseObject);
    const formSections = formResponseObject.form_sections;

    const currSectionComponentsArray = formSections[currentSectionIndex].section_components;

    return (
        <>
            {currSectionComponentsArray.map((component, index) => {
                    return (
                        <div key={index}
                             className="form-component-container">
                            {component.component_type}
                        </div>
                    );

                }
            )}


        </>
    );
}

export default SectionContainer;