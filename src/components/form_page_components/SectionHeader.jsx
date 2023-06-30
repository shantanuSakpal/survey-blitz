import React, {useState} from 'react';
import {useSelector} from "react-redux";

function SectionHeader({currentSectionIndex}) {
    //get the section header from formObject
    const formResponseObject = useSelector((state) => state.formResponseObject);
    const formSections = formResponseObject.form_sections;

    const currentSection = formSections[currentSectionIndex];
    //get the total number of sections
    const totalSections = formSections.length;

    return (

        <div className="form-section-header"
        >
            <h4>Page {currentSectionIndex + 1} of {totalSections}</h4>
            {currentSection.section_name}
        </div>

    );
}

export default SectionHeader;